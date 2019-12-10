/* eslint-disable no-throw-literal */
import data from "../static/data.json";
import * as util from "../util/commons";
import * as storageKeys from "../store/keys/storageKeys";

const createPermissionString = function(role) {
  let string = "";

  role.permissions.forEach(permission => {
    string += permission + ", ";
  });

  return string.trim().substring(0, string.length - 2);
};

/**
 * Gets all roles.
 */
const getAllRoles = function() {
  const memoryList = localStorage.getItem(storageKeys.ROLES);

  if (util.isValid(memoryList) && memoryList.length !== 0) {
    return JSON.parse(memoryList);
  }

  const roles = data.roles;

  if (!util.isValid(roles) || roles.length === 0) {
    return [];
  }

  for (let index = 0; index < roles.length; index++) {
    roles[index].permissionString = createPermissionString(roles[index]);
  }

  localStorage.setItem(storageKeys.ROLES, JSON.stringify(roles));

  return roles;
};

/**
 * Gets role by ID.
 * @param {Integer} id Role ID
 */
const getRoleByID = id =>
  getAllRoles().filter(r => parseInt(r.id) === parseInt(id))[0];

/**
 * Gets a role by name and optional ID
 * @param {String} name Role name
 * @param {Integer} id Optional Role ID
 */
const getRoleByName = function(name, id) {
  if (id) {
    return getAllRoles().filter(
      r =>
        r.name.toLowerCase() === name.toLowerCase() &&
        parseInt(r.id) !== parseInt(id)
    )[0];
  }

  return getAllRoles().filter(
    r => r.name.toLowerCase() === name.toLowerCase()
  )[0];
};

/**
 * Creates a role.
 * @param {Object} payload Role payload
 */
const createRole = function(payload) {
  let role = getRoleByName(payload.name);

  if (util.isValid(role) && !util.isEmpty(role)) {
    throw "Role already exists";
  }

  const id = parseInt(util.generateRandomNumber(9));

  role = { id, ...payload, permissionString: createPermissionString(payload) };

  const roles = getAllRoles() || [];

  roles.push(role);

  localStorage.setItem(storageKeys.ROLES, JSON.stringify(roles));

  return { roleCreated: true, error: "" };
};

/**
 * Updates a role.
 * @param {Object} payload Role payload
 */
const updateRole = function(payload) {
  let role = getRoleByID(payload.id);

  if (!util.isValid(role) || util.isEmpty(role)) {
    throw "Role not found";
  }

  const duplicateRole = getRoleByName(payload.name, payload.id);

  if (util.isValid(duplicateRole) && !util.isEmpty(duplicateRole)) {
    throw "Role already exists";
  }

  role = { ...payload, permissionString: createPermissionString(payload) };

  const roles = getAllRoles() || [];

  for (let index = 0; index < roles.length; index++) {
    let r = roles[index];
    if (parseInt(role.id) === parseInt(r.id)) {
      roles[index] = role;
      break;
    }
  }

  localStorage.setItem(storageKeys.ROLES, JSON.stringify(roles));

  return { roleUpdated: true, error: "" };
};

/**
 * Deletes a role.
 * @param {Integer} id Role ID
 */
const deleteRole = function(id) {
  const role = getRoleByID(id);

  if (!util.isValid(role) || util.isEmpty(role)) {
    throw "Role not found";
  }

  const roles = getAllRoles();

  for (let index = 0; index < roles.length; index++) {
    const r = roles[index];

    if (r.id === role.id) {
      roles.splice(index, 1);
      break;
    }
  }

  localStorage.setItem(storageKeys.ROLES, JSON.stringify(roles));

  return true;
};

export default {
  getAllRoles,
  getRoleByID,
  getRoleByName,
  createRole,
  updateRole,
  deleteRole
};
