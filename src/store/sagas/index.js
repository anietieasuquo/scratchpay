import { fork } from "redux-saga/effects";
import watchAuthentication from "./watchers/authenticationWatchers";
import watchUsers from "./watchers/userWatchers";
import watchRoles from "./watchers/roleWatchers";
import watchPermissions from "./watchers/permissionWatchers";

/**
 * Sets up all watchers.
 */
export default function* rootSaga() {
  yield fork(watchAuthentication);
  yield fork(watchUsers);
  yield fork(watchRoles);
  yield fork(watchPermissions);
}
