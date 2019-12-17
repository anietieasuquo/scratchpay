import * as ACTION_TYPES from "./actionTypes";

/**
 * Creates action to show loading.
 */
export const showLoading = () => ({ type: ACTION_TYPES.SHOW_LOADER });

/**
 * Creates action to show loading.
 */
export const hideLoading = () => ({ type: ACTION_TYPES.HIDE_LOADER });
