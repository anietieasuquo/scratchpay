/* eslint-disable no-throw-literal */
import * as util from "../util/commons";
import { logout } from "../util/authUtil";
import restClient from "../util/restClient";
/**
 * Handles user authentication.
 * @param {Object} payload Authentication payload
 */
const authenticate = payload => {
  return new Promise((resolve, reject) => {
    restClient({ endpoint: "/auth", method: "POST", body: payload })
      .then(res => res.json())
      .then(res => {
        if (!res.token) {
          reject(res.message);
          return;
        }

        const authentication = {
          isAuthenticated: true,
          user: { ...res.user, token: res.token },
          message: ""
        };

        resolve({ authentication });
      })
      .catch(error =>
        reject(!util.isEmpty(error) ? error : "Failed to connect")
      );
  });
};

/**
 * Handles user logout.
 * @returns {Boolean} Indication of successful logout
 */
const logoutUser = async () => {
  logout();
  return true;
};

export default { authenticate, logoutUser };
