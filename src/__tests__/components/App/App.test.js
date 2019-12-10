import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "../../../components/App";
import configureStore from "../../../store/configureStore";

let store = configureStore();

describe("App", () => {
  test("it should render content without error", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const element = getByText(/Login/i);
    expect(element).toBeInTheDocument();
  });
});
