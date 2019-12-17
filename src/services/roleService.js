import restClient from "../util/restClient";

/**
 * Gets all roles.
 */
const getAllRoles = async () => {
  const response = await restClient({
    endpoint: "/roles",
    method: "GET"
  });
  const json = await response.json();

  return json;
};

/**
 * Gets role by ID.
 * @param {Integer} id Role ID
 */
const getRoleByID = async id => {
  const response = await restClient({
    endpoint: `/roles/${id}`,
    method: "GET"
  });
  const json = await response.json();

  return json;
};

/**
 * Creates a role.
 * @param {Object} payload Role payload
 */
const createRole = async payload => {
  const response = await restClient({
    endpoint: "/roles",
    method: "POST",
    body: payload
  });
  const json = await response.json();

  if (response.status !== 201) {
    await Promise.reject(json.message);
    return;
  }

  return { roleCreated: true, error: "", role: json };
};

/**
 * Updates a role.
 * @param {Object} payload Role payload
 */
const updateRole = async payload => {
  const response = await restClient({
    endpoint: `/roles/${payload.id}`,
    method: "PUT",
    body: payload
  });
  const json = await response.json();

  if (response.status !== 202) {
    await Promise.reject(json.message);
    return;
  }

  return { roleUpdated: true, error: "", role: json };
};

/**
 * Deletes a role.
 * @param {Integer} id Role ID
 */
const deleteRole = async id => {
  const response = await restClient({
    endpoint: `/roles/${id}`,
    method: "DELETE"
  });
  const json = await response.json();

  if (response.status !== 202) {
    await Promise.reject(json.message);
    return;
  }

  return { role: { id } };
};

export default {
  getAllRoles,
  getRoleByID,
  createRole,
  updateRole,
  deleteRole
};
