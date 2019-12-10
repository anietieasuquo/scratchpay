import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  authentication: {}
};

/**
 * Authentication reducer to update authentication state.
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const authenticationReducer = function (state = initialState, action) {
  const response = action.response || {};
  switch (action.type) {
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        authentication: { isAuthenticated: false, message: "" }
      };
    case ACTION_TYPES.AUTH_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.AUTH_FAILURE:
      return {
        ...state,
        authentication: { isAuthenticated: false, message: response.error }
      };
    default:
      return state;
  }
};

export default authenticationReducer;
