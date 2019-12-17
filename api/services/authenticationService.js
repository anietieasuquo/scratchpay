import bcrypt from 'bcrypt';
import * as util from "../../src/util/commons";
import userService from "../services/userService";
import database from "../connections/database";

/**
 * Handles user authentication.
 * @param {Object} payload Authentication payload
 * @returns {Promise}
 */
const authenticate = async payload => {
  if (util.isEmpty(payload)) {
    await Promise.reject("Please check your entry");
    return;
  }

  const user = await userService.getUserByEmail(payload.email);

  if (util.isEmpty(user)) {
    await Promise.reject("Account not found");
    return;
  }

  const isCorrect = await bcrypt.compare(payload.password, user.password);

  if (!isCorrect) {
    await Promise.reject("Incorrect password");
    return;
  }

  delete user.password;

  const token = util.generateRandomString(50) + Date.now();

  let query = "INSERT INTO TOKEN (TOKEN, EXPIRES) VALUES(?, ?)";
  let date = new Date();
  date.setDate(date.getDate() + 7);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getUTCFullYear();
  let expires = `${year}-${month}-${day}`;

  await database.query(query, [token, expires]);

  return { user, token };
};

/**
 * Checks if a token is valid and authorized.
 * @param {String} token The authorization token
 */
const isAuthorized = async token => {
  if (!util.isValid(token)) {
    await Promise.reject("Token required");
    return;
  }

  const checkToken = await database.query(
    "SELECT TOKEN as token, EXPIRES as expires FROM TOKEN WHERE TOKEN = ?",
    token
  );

  if (util.isEmpty(checkToken)) {
    await Promise.reject("Token not found");
    return;
  }

  if (Date.parse(checkToken[0].expires) < new Date()) {
    await Promise.reject("Token expired");
    return;
  }

  return { auth: true };
};

export default { authenticate, isAuthorized };
