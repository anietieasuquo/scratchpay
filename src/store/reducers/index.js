import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";

/**
 * Root reducer to combine all reducers.
 */
const rootReducer = combineReducers({
  authenticationReducer,
  userReducer,
  roleReducer
});

export default rootReducer;
