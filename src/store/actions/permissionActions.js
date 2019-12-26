import * as ACTION_TYPES from "./actionTypes";

/**
 * Creates action to get all permissions.
 */
export const getAllPermissions = () => ({
  type: ACTION_TYPES.GET_ALL_PERMISSIONS
});

/**
 * Creates action to get permission by ID
 * @param {Integer} id Permission ID
 */
export const getPermissionByID = id => ({
  type: ACTION_TYPES.GET_PERMISSION_BY_ID,
  payload: id
});

/**
 * Creates action to create new permission.
 * @param {Object} payload Permission data payload
 */
export const createPermission = payload => ({
  type: ACTION_TYPES.CREATE_PERMISSION,
  payload: payload
});

/**
 * Creates action to clear permission creation and update flags from store.
 */
export const clearPermissionCreate = () => ({
  type: ACTION_TYPES.CLEAR_PERMISSION_CREATE
});

/**
 * Creates action to update a permission.
 * @param {Object} payload Permission data payload
 */
export const updatePermission = payload => ({
  type: ACTION_TYPES.UPDATE_PERMISSION,
  payload: payload
});

/**
 * Creates action to delete permission by ID.
 * @param {Integer} id Permission ID
 */
export const deletePermission = id => ({
  type: ACTION_TYPES.DELETE_PERMISSION,
  payload: id
});
