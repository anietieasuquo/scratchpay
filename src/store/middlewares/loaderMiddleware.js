import * as APP_ACTIONS from "../actions/appActions";

const loaderMiddleware = ({ dispatch }) => next => action => {
  const suffixes = ["SUCCESS", "FAILURE"];
  const parts = action.type.split("_");
  const suffix = parts[parts.length - 1];
  
  if (!suffixes.includes(suffix) && suffix !== 'LOADER') {
    dispatch(APP_ACTIONS.showLoading());
  } else if (suffixes.includes(suffix) && suffix !== 'LOADER') {
    dispatch(APP_ACTIONS.hideLoading());
  }

  next(action);
};

export default loaderMiddleware;
