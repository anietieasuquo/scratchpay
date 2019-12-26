import * as ACTION_TYPES from "./actionTypes";

/**
 * Creates action to authenticate a user.
 * @param {Object} payload Authentication data payload
 */
export const authenticate = payload => ({
  type: ACTION_TYPES.AUTHENTICATE,
  payload: payload
});

/**
 * Creates action to logout a user.
 */
export const logout = () => ({ type: ACTION_TYPES.LOGOUT });

/**
 * Creates action to redirect user to 403 page.
 */
export const forbidden = () => ({ type: ACTION_TYPES.AUTH_FORBIDDEN });
