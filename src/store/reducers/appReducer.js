import * as ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  loading: false
};

/**
 * App reducer
 * @param {Object} state Current state set to initial state.
 * @param {Object} action Reducer action
 */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_LOADER:
      return { ...state, loading: true };
    case ACTION_TYPES.HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default appReducer;
