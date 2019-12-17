import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  authentication: {
    authAction: 200,
    message: ""
  }
};

/**
 * Authentication reducer to update authentication state.
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const authenticationReducer = (state = initialState, action) => {
  const response = action.response || {};
  switch (action.type) {
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          isAuthenticated: false,
          message: "",
          isLoggedOut: true,
          authAction: 200
        }
      };
    case ACTION_TYPES.AUTH_FORBIDDEN:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          authAction: 403
        }
      };
    case ACTION_TYPES.AUTH_SUCCESS:
      return { ...state, ...response, isLoggedOut: false, authAction: 200 };
    case ACTION_TYPES.AUTH_FAILURE:
      return {
        ...state,
        authentication: {
          isAuthenticated: false,
          message: response.error,
          isLoggedOut: false,
          authAction: 200
        }
      };
    default:
      return state;
  }
};

export default authenticationReducer;
