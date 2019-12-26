import { combineReducers } from "redux";

import appReducer from "./appReducer";
import authenticationReducer from "./authenticationReducer";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";

/**
 * Root reducer to combine all reducers.
 */
const rootReducer = combineReducers({
  appReducer,
  authenticationReducer,
  userReducer,
  roleReducer,
  permissionReducer
});

export default rootReducer;
