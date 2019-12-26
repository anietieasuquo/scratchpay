import { getAuthToken, checkAuth } from "./authUtil";
import { isValid } from "./commons";

/**
 * Makes REST request
 * @param {Object} params Request parameters
 */
const client = ({ endpoint, method, body }) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(body)
    })
      .then(res => checkAuth(res))
      .then(res => {
        resolve(res);
      })
      .catch(error => reject(isValid(error) ? error : "Failed to connect"));
  });
};

export default client;
