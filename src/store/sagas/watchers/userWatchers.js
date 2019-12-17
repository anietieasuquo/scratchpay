import { takeLatest } from "redux-saga/effects";
import {
  getUsersSaga,
  getUserByIdSaga,
  createUserSaga,
  updateUserSaga,
  deleteUserSaga
} from "../userSaga";

import * as ACTION_TYPES from "../../actions/actionTypes";

/**
 * Watches for user actions and pipes to user saga.
 */
export default function* watchUsers() {
  yield takeLatest(ACTION_TYPES.GET_ALL_USERS, getUsersSaga);
  yield takeLatest(ACTION_TYPES.GET_USER_BY_ID, getUserByIdSaga);
  yield takeLatest(ACTION_TYPES.CREATE_USER, createUserSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_USER, updateUserSaga);
  yield takeLatest(ACTION_TYPES.DELETE_USER, deleteUserSaga);
}
