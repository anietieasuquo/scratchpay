import { setCookie, getCookie, checkCookie, deleteCookie } from "./cookies";
import * as storageKeys from "../store/keys/storageKeys";

/**
 * Stores authenticated user data in memory.
 * @param {Object} user User object
 */
const login = user => {
  setCookie(storageKeys.AUTH_TOKEN, user.token, 1);
  localStorage.setItem(storageKeys.AUTH_USER, JSON.stringify(user));
};

/**
 * Checks if current user is authenticated.
 * @returns {Boolean} Login status
 */
const isLoggedIn = () => checkCookie(storageKeys.AUTH_TOKEN) !== null;

/**
 * Removes authenticated user data from memory.
 */
const logout = () => {
  deleteCookie(storageKeys.AUTH_TOKEN);
  localStorage.removeItem(storageKeys.AUTH_USER);
};

/**
 * Fetches the current authenticated user from memory.
 * @returns {Object} Auth user
 */
const getAuthUser = () =>
  JSON.parse(localStorage.getItem(storageKeys.AUTH_USER));

/**
 * Gets the current auth token.
 * @returns {String} Auth token
 */
const getAuthToken = () => getCookie(storageKeys.AUTH_TOKEN);

/**
 * Checks if HTTP response is authorized.
 * @param {Object} response HTTP Response
 * @returns {Object} The HTTP response when it's authorized
 */
const checkAuth = response => {
  if (response.status === 401 || response.status === 403) {
    throw response.status;
  }

  return response;
};

export { login, isLoggedIn, logout, getAuthUser, getAuthToken, checkAuth };
