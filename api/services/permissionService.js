import * as util from "../../src/util/commons";
import database from "../connections/database";

/**
 * Gets all permissions.
 */
const getAllPermissions = async () => {
  let query =
    "SELECT p.id, p.name, role.id AS roleId, role.name AS roleName " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN PERMISSION p " +
    "ON rp.permission_id=p.id " +
    "LEFT JOIN ROLE role " +
    "ON rp.role_id = role.id " +
    "GROUP BY p.id";

  return await database.query(query);
};

/**
 * Gets permission by ID.
 * @param {Integer} id Permission ID
 */
const getPermissionByID = async id => {
  let query =
    "SELECT p.id, p.name, role.id AS roleId, role.name AS roleName " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN PERMISSION p " +
    "ON rp.permission_id=p.id " +
    "LEFT JOIN ROLE role " +
    "ON rp.role_id = role.id " +
    "WHERE p.id = ? " +
    "GROUP BY p.id";

  let permissions = await database.query(query, id);
  return permissions[0];
};

/**
 * Gets permission by name.
 * @param {Integer} name Permission name
 */
const getPermissionByName = async (name, id) => {
  let query =
    "SELECT p.id, p.name, role.id AS roleId, role.name AS roleName " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN PERMISSION p " +
    "ON rp.permission_id=p.id " +
    "LEFT JOIN ROLE role " +
    "ON rp.role_id = role.id " +
    "WHERE p.name = ? " +
    "GROUP BY p.id";

  if (id) {
    query =
      "SELECT p.id, p.name, role.id AS roleId, role.name AS roleName " +
      "FROM ROLE_PERMISSION rp " +
      "RIGHT JOIN PERMISSION p " +
      "ON rp.permission_id=p.id " +
      "LEFT JOIN ROLE role " +
      "ON rp.role_id = role.id " +
      "WHERE p.name = ? " +
      "AND p.id = ? " +
      "GROUP BY p.id";
  }

  let permissions = await database.query(query, [name, id]);
  return permissions[0];
};

/**
 * Creates a permission.
 * @param {Object} payload Permission payload
 */
const createPermission = async payload => {
  let permission = await getPermissionByName(payload.name);

  if (!util.isEmpty(permission)) {
    await Promise.reject("Permission already exists");
    return;
  }

  let query = "INSERT INTO PERMISSION (NAME) VALUES(?)";
  let insert = await database.query(query, payload.name);

  return insert.insertId;
};

/**
 * Updates a permission.
 * @param {Object} payload Permission payload
 */
const updatePermission = async (id, payload) => {
  let permission = await getPermissionByID(id);

  if (!util.isValid(permission) || util.isEmpty(permission)) {
    return {};
  }

  let duplicate = await getPermissionByName(payload.name, id);

  if (util.isValid(duplicate) && !util.isEmpty(duplicate)) {
    await Promise.reject("Permission already exists");
    return;
  }

  if (util.isEmpty(duplicate)) {
    permission = {
      ...permission,
      ...payload
    };

    let query = "UPDATE PERMISSION SET `NAME` = ? WHERE ID = ?";

    await database.query(query, [payload.name, id]);

    return { id, ...payload };
  }
};

/**
 * Deletes a permission.
 * @param {Integer} id Permission ID
 */
const deletePermission = async id => {
  const permission = await getPermissionByID(id);
  if (!util.isValid(permission) || util.isEmpty(permission)) {
    return false;
  }

  const query =
    "DELETE FROM ROLE_PERMISSION WHERE PERMISSION_ID = ?; DELETE FROM PERMISSION WHERE ID = ?";

  const deletePermission = await database.query(query, [id, id]);

  if (deletePermission.length < 2 || deletePermission[1].affectedRows === 0) {
    await Promise.reject("Failed to delete");
  }

  return true;
};

export default {
  getAllPermissions,
  getPermissionByID,
  getPermissionByName,
  createPermission,
  updatePermission,
  deletePermission
};
