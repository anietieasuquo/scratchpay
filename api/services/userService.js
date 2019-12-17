import bcrypt from "bcrypt";
import * as util from "../../src/util/commons";
import roleService from "./roleService";
import database from "../connections/database";

const BCRYPT_ROUND = 10;

const transformUser = user => {
  if (util.isEmpty(user)) {
    return {};
  }

  const permissions = [];
  if (!util.isEmpty(user.permissions)) {
    user.permissions.split(",").forEach(p => permissions.push(p));
  }

  user.role = {
    id: user.roleId,
    name: user.roleName,
    permissions: permissions,
    permissionString: user.permissions
  };

  delete user.roleId;
  delete user.roleName;
  delete user.permissions;

  return user;
};

/**
 * Gets all users.
 */
const getAllUsers = async () => {
  const query =
    "SELECT user.ID AS id, user.FIRST_NAME AS firstName, " +
    "user.LAST_NAME AS lastName, user.EMAIL AS email, " +
    "user.ROLE_ID AS roleId, user.STATUS AS status, " +
    "role.id as roleId, role.NAME as roleName, role.permissions " +
    "FROM USER user " +
    "LEFT JOIN (" +
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "GROUP BY role.id" +
    ") AS role " +
    "ON user.role_id=role.id";

  let users = await database.query(query);
  users.forEach(user => transformUser(user));

  return users;
};

/**
 * Gets a user by ID
 * @param {Integer} id User ID
 */
const getUserByID = async id => {
  const query =
    "SELECT user.ID AS id, user.FIRST_NAME AS firstName, " +
    "user.LAST_NAME AS lastName, user.EMAIL AS email, " +
    "user.ROLE_ID AS roleId, user.STATUS AS status, " +
    "role.id as roleId, role.NAME as roleName, role.permissions " +
    "FROM USER user " +
    "LEFT JOIN (" +
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "GROUP BY role.id" +
    ") AS role " +
    "ON user.role_id=role.id " +
    "WHERE user.ID = ?";

  let users = await database.query(query, parseInt(id));

  return transformUser(users[0]);
};

/**
 * Gets a user by email and optional ID
 * @param {String} email User email address
 * @param {Integer} id Optional User ID
 */
const getUserByEmail = async (email, id) => {
  let query =
    "SELECT user.ID AS id, user.FIRST_NAME AS firstName, " +
    "user.LAST_NAME AS lastName, user.EMAIL AS email, user.password, " +
    "user.ROLE_ID AS roleId, user.STATUS AS status, " +
    "role.id as roleId, role.NAME as roleName, role.permissions " +
    "FROM USER user " +
    "LEFT JOIN (" +
    "SELECT role.id, role.name, " +
    "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions " +
    "FROM ROLE_PERMISSION rp " +
    "RIGHT JOIN ROLE role " +
    "ON rp.role_id=role.id " +
    "LEFT JOIN PERMISSION permission " +
    "ON rp.permission_id = permission.id " +
    "GROUP BY role.id" +
    ") AS role " +
    "ON user.role_id=role.id " +
    "WHERE user.email = ?";
  if (id) {
    query =
      "SELECT user.ID AS id, user.FIRST_NAME AS firstName, " +
      "user.LAST_NAME AS lastName, user.EMAIL AS email, " +
      "user.ROLE_ID AS roleId, user.STATUS AS status, user.password, " +
      "role.id as roleId, role.NAME as roleName, role.permissions " +
      "FROM USER user " +
      "LEFT JOIN (" +
      "SELECT role.id, role.name, " +
      "GROUP_CONCAT(DISTINCT permission.name SEPARATOR ',') AS permissions " +
      "FROM ROLE_PERMISSION rp " +
      "RIGHT JOIN ROLE role " +
      "ON rp.role_id=role.id " +
      "LEFT JOIN PERMISSION permission " +
      "ON rp.permission_id = permission.id " +
      "GROUP BY role.id" +
      ") AS role " +
      "ON user.role_id=role.id " +
      "WHERE user.email = ? AND user.id != ?";
  }

  let users = await database.query(query, [email, id]);
  return transformUser(users[0]);
};

/**
 * Creates a user.
 * @param {Object} payload User data payload
 */
const createUser = async payload => {
  let user = await getUserByEmail(payload.email);

  if (util.isValid(user) && !util.isEmpty(user)) {
    await Promise.reject("Email already exists");
    return;
  }

  const role = await roleService.getRoleByID(payload.role);

  if (!util.isValid(role) || util.isEmpty(role)) {
    await Promise.reject("Role not found");
    return;
  }

  const password = await bcrypt.hash(payload.password, BCRYPT_ROUND);

  let query =
    "INSERT INTO USER (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, STATUS, ROLE_ID) VALUES (?, ?, ?, ?, ?, ?)";

  const createUser = await database.query(query, [
    payload.firstName,
    payload.lastName,
    payload.email,
    password,
    payload.status,
    payload.role
  ]);

  const id = createUser.insertId;
  delete payload.roleId;

  return { id, ...payload, role };
};

/**
 * Updates a user.
 * @param {Object} payload User data payload
 */
const updateUser = async (id, payload) => {
  let user = await getUserByID(id);
  if (!util.isValid(user) || util.isEmpty(user)) {
    return {};
  }

  const duplicate = await getUserByEmail(payload.email, id);

  if (util.isValid(duplicate) && !util.isEmpty(duplicate)) {
    await Promise.reject("Email already exists");
    return;
  }

  const role = await roleService.getRoleByID(payload.role);

  if (!util.isValid(role) || util.isEmpty(role)) {
    await Promise.reject("Role not found");
    return;
  }

  const password = await bcrypt.hash(payload.password, BCRYPT_ROUND);

  let query =
    "UPDATE USER SET FIRST_NAME = ?, LAST_NAME = ?, EMAIL = ?, PASSWORD = ?, STATUS = ?, ROLE_ID = ? WHERE ID = ?";

  await database.query(query, [
    payload.firstName,
    payload.lastName,
    payload.email,
    password,
    payload.status,
    payload.role,
    id
  ]);

  delete payload.password;
  delete payload.roleId;

  return { id, ...payload, role };
};

/**
 * Deletes a user.
 * @param {Integer} id User ID
 */
const deleteUser = async id => {
  const user = await getUserByID(id);

  if (!util.isValid(user) || util.isEmpty(user)) {
    return false;
  }

  const query = "DELETE FROM USER WHERE ID = ?";
  const deleted = await database.query(query, id);

  if (deleted.affectedRows === 0) {
    await Promise.reject("Failed to delete");
  }

  return { deleted: true };
};

export default {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser
};
