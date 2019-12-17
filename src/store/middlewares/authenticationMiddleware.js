import * as AUTHENTICATION_ACTIONS from "../actions/authenticationActions";

const authenticationMiddleware = ({ dispatch }) => next => action => {
  if (action.response && action.response.error === 401) {
    dispatch(AUTHENTICATION_ACTIONS.logout());
  } else if (action.response && action.response.error === 403) {
    dispatch(AUTHENTICATION_ACTIONS.forbidden());
  } else {
    next(action);
  }
};

export default authenticationMiddleware;
