import * as ACTION_TYPES from "./actionTypes";

/**
 * Creates action to get all users.
 */
export const getAllUsers = () => ({ type: ACTION_TYPES.GET_ALL_USERS });

/**
 * Creates action to get user by ID
 * @param {Integer} id User ID
 */
export const getUserById = id => ({
  type: ACTION_TYPES.GET_USER_BY_ID,
  payload: id
});

/**
 * Creates action to create new user.
 * @param {Object} payload User data payload
 */
export const createUser = payload => ({
  type: ACTION_TYPES.CREATE_USER,
  payload: payload
});

/**
 * Creates action to clear user creation and update flags from store.
 */
export const clearUserCreate = () => ({ type: ACTION_TYPES.CLEAR_USER_CREATE });

/**
 * Creates action to update a user.
 * @param {Object} payload User data payload
 */
export const updateUser = payload => ({
  type: ACTION_TYPES.UPDATE_USER,
  payload: payload
});

/**
 * Creates action to delete user by ID.
 * @param {Integer} id User ID
 */
export const deleteUser = id => ({
  type: ACTION_TYPES.DELETE_USER,
  payload: id
});
