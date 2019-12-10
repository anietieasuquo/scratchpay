import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";

import Dashboard from "../../../components/Dashboard";
import configureStore from "../../../store/configureStore";
import { login } from "../../../util/authUtil";

let store = configureStore();

afterEach(cleanup);

describe("Dashboard", () => {
  test("it should render content without error", () => {
    const fakeUser = {
      id: 10001,
      firstName: "John",
      token: "343498434343hj43jhjh4hj34h"
    };
    login(fakeUser);

    const { getByText } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const element = getByText(/Users/i);
    expect(element).toBeInTheDocument();
  });
});
