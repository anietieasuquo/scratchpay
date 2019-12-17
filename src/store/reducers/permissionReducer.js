import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  permissions: [],
  permission: {},
  error: "",
  permissionCreated: false,
  permissionUpdated: false
};

/**
 * Permission reducer to update permission state.
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const permissionReducer = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case ACTION_TYPES.GET_PERMISSION_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.GET_PERMISSION_FAILURE:
      return { ...state, permissions: [] };
    case ACTION_TYPES.CREATE_PERMISSION_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.CREATE_PERMISSION_FAILURE:
      return { ...state, permissions: [], error: response.error };
    case ACTION_TYPES.CLEAR_PERMISSION_CREATE:
      return {
        ...state,
        permissionCreated: false,
        permissionUpdated: false,
        error: ""
      };
    case ACTION_TYPES.UPDATE_PERMISSION_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.UPDATE_PERMISSION_FAILURE:
      return { ...state, permissions: [], error: response.error };
    case ACTION_TYPES.DELETE_PERMISSION_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.DELETE_PERMISSION_FAILURE:
      return { ...state, ...response };
    default:
      return state;
  }
};

export default permissionReducer;
