import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  users: [],
  user: {},
  error: "",
  userCreated: false,
  userUpdated: false
};

/**
 * User reducer to update user state.
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const userReducer = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case ACTION_TYPES.GET_USER_SUCCESS:
      return { ...state, ...response };
    case ACTION_TYPES.GET_USER_FAILURE:
      return { ...state, users: [] };
    case ACTION_TYPES.CREATE_USER_SUCCESS:
      state.users.push(response.user);
      return { ...state, ...response };
    case ACTION_TYPES.CREATE_USER_FAILURE:
      return { ...state, users: [], error: response.error };
    case ACTION_TYPES.CLEAR_USER_CREATE:
      return { ...state, userCreated: false, userUpdated: false, error: "" };
    case ACTION_TYPES.UPDATE_USER_SUCCESS:
      state.users = state.users.map(u => {
        return parseInt(u.id) === parseInt(response.user.id)
          ? response.user
          : u;
      });
      return { ...state, ...response };
    case ACTION_TYPES.UPDATE_USER_FAILURE:
      return { ...state, users: [], error: response.error };
    case ACTION_TYPES.DELETE_USER_SUCCESS:
      state.users = state.users.filter(
        u => parseInt(u.id) !== parseInt(response.user.id)
      );
      return { ...state, ...response };
    case ACTION_TYPES.DELETE_USER_FAILURE:
      return { ...state, ...response };
    default:
      return state;
  }
};

export default userReducer;
