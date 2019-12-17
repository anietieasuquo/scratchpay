import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  roles: [],
  role: {},
  error: "",
  roleCreated: false,
  roleUpdated: false
};

/**
 * Role reducer to update role state.
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const roleReducer = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case ACTION_TYPES.GET_ROLE_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.GET_ROLE_FAILURE:
      return { ...state, roles: [] };
    case ACTION_TYPES.CREATE_ROLE_SUCCESS:
      state.roles.push(response.role);
      return { ...state, ...response };
    case ACTION_TYPES.CREATE_ROLE_FAILURE:
      return { ...state, roles: [], error: response.error };
    case ACTION_TYPES.CLEAR_ROLE_CREATE:
      return { ...state, roleCreated: false, roleUpdated: false, error: "" };
    case ACTION_TYPES.UPDATE_ROLE_SUCCESS:
      state.roles = state.roles.map(r => {
        return parseInt(r.id) === parseInt(response.role.id)
          ? response.role
          : r;
      });
      return { ...state, ...response };
    case ACTION_TYPES.UPDATE_ROLE_FAILURE:
      return { ...state, roles: [], error: response.error };
    case ACTION_TYPES.DELETE_ROLE_SUCCESS:
      state.roles = state.roles.filter(
        r => parseInt(r.id) !== parseInt(response.role.id)
      );
      return { ...state, ...response };
    case ACTION_TYPES.DELETE_ROLE_FAILURE:
      return { ...state, ...response };
    default:
      return state;
  }
};

export default roleReducer;
