import { put, call } from "redux-saga/effects";
import permissionService from "../../services/permissionService";

import * as ACTION_TYPES from "../actions/actionTypes";

/**
 * Get permissions saga to handles getPermissions action.
 */
export function* getPermissionsSaga() {
  try {
    const response = yield call(permissionService.getAllPermissions);

    yield put({
      type: ACTION_TYPES.GET_PERMISSION_SUCCESS,
      response: { permissions: response }
    });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.GET_PERMISSION_FAILURE,
      response: { error }
    });
  }
}

/**
 * Get permission by ID saga to hangle getPermissionByID action.
 * @param {Object} payload Permission action payload containing permission ID
 */
export function* getPermissionByIdSaga(payload) {
  try {
    const response = yield call(
      permissionService.getPermissionByID,
      payload.payload
    );

    yield put({
      type: ACTION_TYPES.GET_PERMISSION_SUCCESS,
      response: { permission: response }
    });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.GET_PERMISSION_FAILURE,
      response: { error }
    });
  }
}

/**
 * Create permission saga to handle createPermission action.
 * @param {Object} payload Permission action payload
 */
export function* createPermissionSaga(payload) {
  try {
    const response = yield call(
      permissionService.createPermission,
      payload.payload
    );

    yield put({ type: ACTION_TYPES.CREATE_PERMISSION_SUCCESS, response });
    yield put({ type: ACTION_TYPES.GET_ALL_PERMISSIONS });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.CREATE_PERMISSION_FAILURE,
      response: { error }
    });
    yield put({ type: ACTION_TYPES.GET_ALL_PERMISSIONS });
  }
}

/**
 * Update permission saga to handle updatePermission action.
 * @param {Object} payload Permission action payload
 */
export function* updatePermissionSaga(payload) {
  try {
    const response = yield call(
      permissionService.updatePermission,
      payload.payload
    );

    yield put({ type: ACTION_TYPES.UPDATE_PERMISSION_SUCCESS, response });
    yield put({ type: ACTION_TYPES.GET_ALL_PERMISSIONS });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.UPDATE_PERMISSION_FAILURE,
      response: { error }
    });
  }
}

/**
 * Delete permission saga to handle deletePermission action.
 * @param {Object} payload Permission action payload containing permission ID
 */
export function* deletePermissionSaga(payload) {
  try {
    const response = yield call(
      permissionService.deletePermission,
      payload.payload
    );

    yield put({ type: ACTION_TYPES.DELETE_PERMISSION_SUCCESS, response });
    yield put({ type: ACTION_TYPES.GET_ALL_PERMISSIONS });
  } catch (error) {
    yield put({
      type: ACTION_TYPES.DELETE_PERMISSION_FAILURE,
      response: { error }
    });
  }
}
