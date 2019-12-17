import { put, call } from "redux-saga/effects";
import roleService from "../../services/roleService";

import * as ACTION_TYPES from "../actions/actionTypes";

/**
 * Get roles saga to handles getRoles action.
 */
export function* getRolesSaga() {
  try {
    const response = yield call(roleService.getAllRoles);

    yield put({
      type: ACTION_TYPES.GET_ROLE_SUCCESS,
      response: { roles: response }
    });
  } catch (error) {
    yield put({ type: ACTION_TYPES.GET_ROLE_FAILURE, response: { error } });
  }
}

/**
 * Get role by ID saga to hangle getRoleByID action.
 * @param {Object} payload Role action payload containing role ID
 */
export function* getRoleByIdSaga(payload) {
  try {
    const response = yield call(roleService.getRoleByID, payload.payload);

    yield put({
      type: ACTION_TYPES.GET_ROLE_SUCCESS,
      response: { role: response }
    });
  } catch (error) {
    yield put({ type: ACTION_TYPES.GET_ROLE_FAILURE, response: { error } });
  }
}

/**
 * Create role saga to handle createRole action.
 * @param {Object} payload Role action payload
 */
export function* createRoleSaga(payload) {
  try {
    const response = yield call(roleService.createRole, payload.payload);
    yield put({ type: ACTION_TYPES.CREATE_ROLE_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_ROLE_FAILURE, response: { error } });
  }
}

/**
 * Update role saga to handle updateRole action.
 * @param {Object} payload Role action payload
 */
export function* updateRoleSaga(payload) {
  try {
    const response = yield call(roleService.updateRole, payload.payload);

    yield put({ type: ACTION_TYPES.UPDATE_ROLE_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_ROLE_FAILURE, response: { error } });
  }
}

/**
 * Delete role saga to handle deleteRole action.
 * @param {Object} payload Role action payload containing role ID
 */
export function* deleteRoleSaga(payload) {
  try {
    const response = yield call(roleService.deleteRole, payload.payload);

    yield put({ type: ACTION_TYPES.DELETE_ROLE_SUCCESS, response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.DELETE_ROLE_FAILURE, response: { error } });
  }
}
