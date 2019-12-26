import { takeLatest } from "redux-saga/effects";
import {
  getRolesSaga,
  getRoleByIdSaga,
  createRoleSaga,
  updateRoleSaga,
  deleteRoleSaga
} from "../roleSaga";

import * as ACTION_TYPES from "../../actions/actionTypes";

/**
 * Watches for role actions and pipes to role saga.
 */
export default function* watchRoles() {
  yield takeLatest(ACTION_TYPES.GET_ALL_ROLES, getRolesSaga);
  yield takeLatest(ACTION_TYPES.GET_ROLE_BY_ID, getRoleByIdSaga);
  yield takeLatest(ACTION_TYPES.UPDATE_ROLE, updateRoleSaga);
  yield takeLatest(ACTION_TYPES.CREATE_ROLE, createRoleSaga);
  yield takeLatest(ACTION_TYPES.DELETE_ROLE, deleteRoleSaga);
}
