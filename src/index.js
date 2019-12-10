import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./static/scss/index.scss";

import App from "./components/App";

import configureStore from './store/configureStore';

let store = configureStore();

const provider = (
  <Provider store={ store }>
    <App />
  </Provider>
);

ReactDOM.render(provider, document.getElementById("root"));
