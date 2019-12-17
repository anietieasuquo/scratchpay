import restClient from "../util/restClient";

/**
 * Gets all permissions.
 */
const getAllPermissions = function() {
  return new Promise((resolve, reject) => {
    restClient({ endpoint: "/permissions", method: "GET" })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

/**
 * Gets permission by ID.
 * @param {Integer} id Permission ID
 */
const getPermissionByID = id => {
  return new Promise((resolve, reject) => {
    restClient({ endpoint: `/permissions/${id}`, method: "GET" })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

/**
 * Creates a permission.
 * @param {Object} payload Permission payload
 */
const createPermission = function(payload) {
  return new Promise((resolve, reject) => {
    restClient({ endpoint: "/permissions", method: "POST", body: payload })
      .then(res => {
        if (res.status !== 201) {
          reject(res.message);
          return;
        }

        resolve({ permissionCreated: true, error: "" });
      })
      .catch(error => reject(error));
  });
};

/**
 * Updates a permission.
 * @param {Object} payload Permission payload
 */
const updatePermission = function(payload) {
  return new Promise((resolve, reject) => {
    restClient({
      endpoint: `/permissions/${payload.id}`,
      method: "PUT",
      body: payload
    })
      .then(res => {
        if (res.status !== 202) {
          reject(res.message);
          return;
        }

        resolve({ permissionUpdated: true, error: "" });
      })
      .catch(error => reject(error));
  });
};

/**
 * Deletes a permission.
 * @param {Integer} id Permission ID
 */
const deletePermission = function(id) {
  return new Promise((resolve, reject) => {
    restClient({ endpoint: `/permissions/${id}`, method: "DELETE" })
      .then(res => {
        if (res.status !== 202) {
          reject(res.message);
          return;
        }

        resolve(true);
      })
      .catch(error => reject(error));
  });
};

export default {
  getAllPermissions,
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission
};
