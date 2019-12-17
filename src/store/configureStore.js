import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

import loaderMiddleware from "./middlewares/loaderMiddleware";
import authenticationMiddleware from "./middlewares/authenticationMiddleware";

/**
 * Configures store with saga.
 */
const configureStore = function() {
  const sagaMiddleware = createSagaMiddleware();

  return {
    ...createStore(
      rootReducer,
      applyMiddleware(
        sagaMiddleware,
        logger,
        loaderMiddleware,
        authenticationMiddleware
      )
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
