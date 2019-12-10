/* eslint-disable no-throw-literal */
import data from "../static/data.json";
import * as util from "../util/commons";
import roleService from "./roleService";
import * as storageKeys from "../store/keys/storageKeys";

/**
 * Gets all users.
 */
const getAllUsers = function() {
  const memoryList = localStorage.getItem(storageKeys.USERS);

  if (util.isValid(memoryList) && memoryList.length !== 0) {
    return JSON.parse(memoryList);
  }

  const users = data.users;

  if (!util.isValid(users) || users.length === 0) {
    return [];
  }

  for (let index = 0; index < users.length; index++) {
    let user = users[index];
    let role = roleService.getRoleByID(user.roleId);
    users[index].role = role;
  }

  localStorage.setItem(storageKeys.USERS, JSON.stringify(users));

  return users;
};

/**
 * Gets a user by ID
 * @param {Integer} id User ID
 */
const getUserByID = id =>
  getAllUsers().filter(u => parseInt(u.id) === parseInt(id))[0];

/**
 * Gets a user by email and optional ID
 * @param {String} email User email address
 * @param {Integer} id Optional User ID
 */
const getUserByEmail = function(email, id) {
  const users = getAllUsers();

  if (id) {
    return users.filter(
      u => u.email === email && parseInt(u.id) !== parseInt(id)
    )[0];
  }

  return users.filter(u => u.email === email)[0];
};

/**
 * Creates a user.
 * @param {Object} payload User data payload
 */
const createUser = function(payload) {
  let user = getUserByEmail(payload.email);

  if (util.isValid(user) && !util.isEmpty(user)) {
    throw "Email already exists";
  }

  const role = roleService.getRoleByName(payload.role);

  if (!util.isValid(role) || util.isEmpty(role)) {
    throw "Role not found";
  }

  const password = window.btoa(payload.password);
  const id = parseInt(util.generateRandomNumber(9));

  user = { id, ...payload, password, role };

  const users = getAllUsers() || [];

  users.push(user);

  localStorage.setItem(storageKeys.USERS, JSON.stringify(users));

  return { userCreated: true, error: "" };
};

/**
 * Updates a user.
 * @param {Object} payload User data payload
 */
const updateUser = function(payload) {
  let user = getUserByID(payload.id);

  if (!util.isValid(user) || util.isEmpty(user)) {
    throw "User not found";
  }

  const duplicateUser = getUserByEmail(payload.email, payload.id);

  if (util.isValid(duplicateUser) && !util.isEmpty(duplicateUser)) {
    throw "Email already exists";
  }

  const role = roleService.getRoleByName(payload.role);

  if (!util.isValid(role) || util.isEmpty(role)) {
    throw "Role not found";
  }

  const password = window.btoa(payload.password);

  user = { ...payload, password, role };

  const users = getAllUsers() || [];

  for (let index = 0; index < users.length; index++) {
    let u = users[index];
    if (parseInt(user.id) === parseInt(u.id)) {
      users[index] = user;
      break;
    }
  }

  localStorage.setItem(storageKeys.USERS, JSON.stringify(users));

  return { userUpdated: true, error: "" };
};

/**
 * Deletes a user.
 * @param {Integer} id User ID
 */
const deleteUser = function(id) {
  const user = getUserByID(id);

  if (!util.isValid(user) || util.isEmpty(user)) {
    throw "User not found";
  }

  const users = getAllUsers();

  for (let index = 0; index < users.length; index++) {
    const u = users[index];

    if (u.id === user.id) {
      users.splice(index, 1);
      break;
    }
  }

  localStorage.setItem(storageKeys.USERS, JSON.stringify(users));

  return true;
};

export default {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser
};
