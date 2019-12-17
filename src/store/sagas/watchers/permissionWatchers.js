import { takeLatest } from "redux-saga/effects";
import {
  getPermissionsSaga,
  getPermissionByIdSaga,
  createPermissionSaga,
  updatePermissionSaga,
  deletePermissionSaga
} from "../permissionSaga";

import * as ACTION_TYPES from "../../actions/actionTypes";

/**
 * Watches for permission actions and through permission saga.
 */
export default function* watchPermissions() {
  yield takeLatest(ACTION_TYPES.GET_ALL_PERMISSIONS, getPermissionsSaga);
  yield takeLatest(ACTION_TYPES.GET_PERMISSION_BY_ID, getPermissionByIdSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_PERMISSION, updatePermissionSaga);
  yield takeLatest(ACTION_TYPES.CREATE_PERMISSION, createPermissionSaga);
  yield takeLatest(ACTION_TYPES.DELETE_PERMISSION, deletePermissionSaga);
}
