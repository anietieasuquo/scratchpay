import { setCookie, checkCookie, deleteCookie } from "./cookies";
import * as storageKeys from "../store/keys/storageKeys";

/**
 * Stores authenticated user data in memory.
 * @param {Object} user User object
 */
const login = function(user) {
  setCookie(storageKeys.AUTH_TOKEN, user.token, 1);
  localStorage.setItem(storageKeys.AUTH_USER, JSON.stringify(user));
};

/**
 * Checks if current user is authenticated.
 */
const isLoggedIn = () => checkCookie(storageKeys.AUTH_TOKEN) !== null;

/**
 * Removes authenticated user data from memory.
 */
const logout = function() {
  deleteCookie(storageKeys.AUTH_TOKEN);
  localStorage.removeItem(storageKeys.AUTH_USER);
};

/**
 * Fetches the current authenticated user from memory.
 */
const getAuthUser = () => JSON.parse(localStorage.getItem(storageKeys.AUTH_USER));

export { login, isLoggedIn, logout, getAuthUser };
