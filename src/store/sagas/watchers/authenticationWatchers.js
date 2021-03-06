import { takeLatest } from "redux-saga/effects";
import { authenticationSaga, logoutSaga } from "../authenticationSaga";

import * as ACTION_TYPES from "../../actions/actionTypes";

/**
 * Watches for authentication actions and pipes to authentication saga.
 */
export default function* watchAuthentication() {
  yield takeLatest(ACTION_TYPES.AUTHENTICATE, authenticationSaga);
  yield takeLatest(ACTION_TYPES.LOGOUT, logoutSaga);
}
