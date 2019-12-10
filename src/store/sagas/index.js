import { fork } from "redux-saga/effects";
import watchAuthentication from "./authenticationWatchers";
import watchUsers from "./userWatchers";
import watchRoles from "./roleWatchers";

/**
 * Sets up all watchers.
 */
export default function* start() {
  yield fork(watchAuthentication);
  yield fork(watchUsers);
  yield fork(watchRoles);
}
