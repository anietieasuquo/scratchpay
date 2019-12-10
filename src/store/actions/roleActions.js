import * as ACTION_TYPES from "./actionTypes";

/**
 * Creates action to get all roles.
 */
export const getAllRoles = () => ({ type: ACTION_TYPES.GET_ALL_ROLES });

/**
 * Creates action to get role by ID
 * @param {Integer} id Role ID
 */
export const getRoleByID = id => ({
  type: ACTION_TYPES.GET_ROLE_BY_ID,
  payload: id
});

/**
 * Creates action to create new role.
 * @param {Object} payload Role data payload
 */
export const createRole = payload => ({
  type: ACTION_TYPES.CREATE_ROLE,
  payload: payload
});

/**
 * Creates action to clear role creation and update flags from store.
 */
export const clearRoleCreate = () => ({ type: ACTION_TYPES.CLEAR_ROLE_CREATE });

/**
 * Creates action to update a role.
 * @param {Object} payload Role data payload
 */
export const updateRole = payload => ({
  type: ACTION_TYPES.UPDATE_ROLE,
  payload: payload
});

/**
 * Creates action to delete role by ID.
 * @param {Integer} id Role ID
 */
export const deleteRole = id => ({
  type: ACTION_TYPES.DELETE_ROLE,
  payload: id
});
