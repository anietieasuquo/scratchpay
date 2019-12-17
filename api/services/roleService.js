import * as util from "../../src/util/commons";
import database from "../connections/database";
import permissionService from "../services/permissionService";

const transformRole = role => {
  if (util.isEmpty(role)) {
    return {};
  }

  role.permissionString = role.permissions || "";
  role.permissions = [];

  const permissionIds = role.permissionIds || "";

  if (util.isValid(role.permissionString)) {
    permissionIds.split(",").forEach(p => role.permissions.push(p));
  }

  delete role.permissionIds;

  return role;
};

/**
 * Gets all roles.
 */
const getAllRoles = async () => {
  let query =
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions, " +
    "GROUP_CONCAT(DISTINCT permission.id SEPARATOR ',') AS permissionIds " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "GROUP BY role.id";

  let roles = await database.query(query);
  roles.forEach(role => transformRole(role));

  return roles;
};

/**
 * Gets role by ID.
 * @param {Integer} id Role ID
 */
const getRoleByID = async id => {
  let query =
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions, " +
    "GROUP_CONCAT(DISTINCT permission.id SEPARATOR ',') AS permissionIds " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "WHERE role.id = ? " +
    "GROUP BY role.id";

  let roles = await database.query(query, id);

  return transformRole(roles[0]);
};

/**
 * Gets a role by name and optional ID
 * @param {String} name Role name
 * @param {Integer} id Optional Role ID
 */
const getRoleByName = async (name, id) => {
  let query =
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions, " +
    "GROUP_CONCAT(DISTINCT permission.id SEPARATOR ',') AS permissionIds " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "WHERE role.name = ? " +
    "GROUP BY role.id";

  if (id) {
    query =
      "SELECT role.id, role.name, " +
      "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions, " +
      "GROUP_CONCAT(DISTINCT permission.id SEPARATOR ',') AS permissionIds " +
      "FROM ROLE_PERMISSION rp " +
      "RIGHT JOIN ROLE role " +
      "ON rp.role_id=role.id " +
      "LEFT JOIN PERMISSION permission " +
      "ON rp.permission_id = permission.id " +
      "WHERE role.name = ?" +
      "AND role.id != ? " +
      "GROUP BY role.id";
  }

  let roles = await database.query(query, [name, id]);
  return transformRole(roles[0]);
};

/**
 * Creates a role.
 * @param {Object} payload Role payload
 */
const createRole = async payload => {
  let role = await getRoleByName(payload.name);

  if (!util.isEmpty(role)) {
    await Promise.reject("Role already exists");
    return;
  }

  let roleQuery = "INSERT INTO ROLE (NAME) VALUES(?)";
  let insert = await database.query(roleQuery, payload.name);

  let id = insert.insertId;
  let permissionQuery = "";
  let permissionString = "";

  for (let index = 0; index < payload.permissions.length; index++) {
    const permissionId = payload.permissions[index];
    const permission = await permissionService.getPermissionByID(permissionId);
    permissionQuery += `INSERT INTO ROLE_PERMISSION (ROLE_ID, PERMISSION_ID) VALUES(${id}, ${permissionId});`;
    permissionString += `${permission.name},`;
  }

  permissionString = permissionString.substring(0, permissionString.length - 1);

  await database.query(permissionQuery, id);

  return { id, ...payload, permissionString };
};

/**
 * Updates a role.
 * @param {Object} payload Role payload
 */
const updateRole = async (id, payload) => {
  let role = await getRoleByID(id);

  if (!util.isValid(role) || util.isEmpty(role)) {
    return {};
  }

  let duplicate = await getRoleByName(payload.name, id);

  if (util.isValid(duplicate) && !util.isEmpty(duplicate)) {
    await Promise.reject("Role already exists");
    return;
  }

  if (util.isEmpty(duplicate)) {
    role = {
      ...role,
      ...payload
    };

    let roleQuery = "UPDATE ROLE SET `NAME` = ? WHERE ID = ?";

    await database.query(roleQuery, [payload.name, id]);

    let deleteQuery = "DELETE FROM ROLE_PERMISSION WHERE ROLE_ID = ?";
    await database.query(deleteQuery, id);

    let permissionQuery = "";
    let permissionString = "";

    for (let index = 0; index < payload.permissions.length; index++) {
      const permissionId = payload.permissions[index];
      const permission = await permissionService.getPermissionByID(
        permissionId
      );
      permissionQuery += `INSERT INTO ROLE_PERMISSION (ROLE_ID, PERMISSION_ID) VALUES(${id}, ${permissionId});`;
      permissionString += `${permission.name},`;
    }

    permissionString = permissionString.substring(0, permissionString.length - 1);

    await database.query(permissionQuery, role.insertId);

    return { id, ...payload, permissionString };
  }
};

/**
 * Deletes a role.
 * @param {Integer} id Role ID
 */
const deleteRole = async id => {
  const role = await getRoleByID(id);
  if (!util.isValid(role) || util.isEmpty(role)) {
    return false;
  }

  const query =
    "DELETE FROM ROLE_PERMISSION WHERE ROLE_ID = ?; DELETE FROM ROLE WHERE ID = ?";

  const deleteRole = await database.query(query, [id, id]);

  if (deleteRole.length < 2 || deleteRole[1].affectedRows === 0) {
    await Promise.reject("Failed to delete");
  }

  return { deleted: true };
};

export default {
  getAllRoles,
  getRoleByID,
  getRoleByName,
  createRole,
  updateRole,
  deleteRole
};
