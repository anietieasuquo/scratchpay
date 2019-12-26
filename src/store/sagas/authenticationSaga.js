import { put, call } from "redux-saga/effects";
import authenticationService from "../../services/authenticationService";

import * as ACTION_TYPES from "../actions/actionTypes";

/**
 * Authentication saga to manage authentication events.
 * @param {Object} payload Authentication data payload
 */
export function* authenticationSaga(payload) {
  try {
    const response = yield call(
      authenticationService.authenticate,
      payload.payload
    );
    yield put({ type: ACTION_TYPES.AUTH_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.AUTH_FAILURE, response: { error } });
  }
}

/**
 * Logout saga to handle logout.
 */
export function* logoutSaga() {
  try {
    const response = yield call(authenticationService.logoutUser);
    yield put({ type: ACTION_TYPES.LOGOUT_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.LOGOUT_FAILURE, response: { error } });
  }
}
