/* eslint-disable no-throw-literal */
import * as util from "../util/commons";
import userService from "../services/userService";
import roleService from "../services/roleService";

/**
 * Handles user authentication.
 * @param {Object} payload Authentication payload
 */
const authenticate = function(payload) {
  const user = userService.getUserByEmail(payload.email);

  if (!util.isValid(user) || util.isEmpty(user)) {
    throw "Account not found";
  }

  const userPassword = window.atob(user.password);

  if (payload.password !== userPassword) {
    throw "Invalid credentials";
  }

  const role = roleService.getRoleByID(user.roleId);

  user.token = util.generateRandomString(50);
  user.role = role;

  delete user.password;

  const authentication = {
    isAuthenticated: true,
    user: user,
    message: ""
  };

  return { authentication };
};

export default { authenticate };
