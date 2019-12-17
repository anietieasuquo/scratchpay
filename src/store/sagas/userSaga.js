import { put, call } from "redux-saga/effects";
import userService from "../../services/userService";

import * as ACTION_TYPES from "../actions/actionTypes";

/**
 * Get users saga to handles getUsers action.
 */
export function* getUsersSaga() {
  try {
    const response = yield call(userService.getAllUsers);

    yield put({
      type: ACTION_TYPES.GET_USER_SUCCESS,
      response: { users: response }
    });
  } catch (error) {
    yield put({ type: ACTION_TYPES.GET_USER_FAILURE, response: { error } });
  }
}

/**
 * Get user by ID saga to hangle getUseryID action.
 * @param {Object} payload User action payload containing user ID
 */
export function* getUserByIdSaga(payload) {
  try {
    const response = yield call(userService.getUserByID, payload.payload);

    yield put({
      type: ACTION_TYPES.GET_USER_SUCCESS,
      response: { user: response }
    });
  } catch (error) {
    yield put({ type: ACTION_TYPES.GET_USER_FAILURE, response: { error } });
  }
}

/**
 * Create user saga to handle createUser action.
 * @param {Object} payload User action payload
 */
export function* createUserSaga(payload) {
  try {
    const response = yield call(userService.createUser, payload.payload);

    yield put({ type: ACTION_TYPES.CREATE_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_USER_FAILURE, response: { error } });
  }
}

/**
 * Update user saga to handle updateUser action.
 * @param {Object} payload User action payload
 */
export function* updateUserSaga(payload) {
  try {
    const response = yield call(userService.updateUser, payload.payload);

    yield put({ type: ACTION_TYPES.UPDATE_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_USER_FAILURE, response: { error } });
  }
}

/**
 * Delete user saga to handle deleteUser action.
 * @param {Object} payload User action payload containing user ID
 */
export function* deleteUserSaga(payload) {
  try {
    const response = yield call(userService.deleteUser, payload.payload);

    yield put({ type: ACTION_TYPES.DELETE_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.DELETE_USER_FAILURE, response: { error } });
  }
}
