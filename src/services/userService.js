import restClient from "../util/restClient";

/**
 * Gets all users.
 */
const getAllUsers = async () => {
  const response = await restClient({
    endpoint: "/users",
    method: "GET"
  });
  const json = await response.json();

  return json;
};

/**
 * Gets a user by ID
 * @param {Integer} id User ID
 */
const getUserByID = async id => {
  const response = await restClient({
    endpoint: `/users/${id}`,
    method: "GET"
  });
  const json = await response.json();

  return json;
};

/**
 * Creates a user.
 * @param {Object} payload User data payload
 */
const createUser = async payload => {
  const response = await restClient({
    endpoint: "/users",
    method: "POST",
    body: payload
  });
  const json = await response.json();

  if (response.status !== 201) {
    await Promise.reject(json.message);
    return;
  }

  return { userCreated: true, error: "", user: json };
};

/**
 * Updates a user.
 * @param {Object} payload User data payload
 */
const updateUser = async payload => {
  const response = await restClient({
    endpoint: `/users/${payload.id}`,
    method: "PUT",
    body: payload
  });
  const json = await response.json();

  if (response.status !== 202) {
    await Promise.reject(json.message);
    return;
  }

  return { userUpdated: true, error: "", user: json };
};

/**
 * Deletes a user.
 * @param {Integer} id User ID
 */
const deleteUser = async id => {
  const response = await restClient({
    endpoint: `/users/${id}`,
    method: "DELETE"
  });
  const json = await response.json();

  if (response.status !== 202) {
    await Promise.reject(json.message);
    return;
  }

  return { user: { id } };
};

export default {
  getAllUsers,
  getUserByID,
  updateUser,
  createUser,
  deleteUser
};
