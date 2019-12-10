import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByAttribute
} from "@testing-library/react";
import { Provider } from "react-redux";

import Login from "../../../components/Login";
import configureStore from "../../../store/configureStore";

let store = configureStore();

afterEach(cleanup);

describe("Login", () => {
  test("it should render content without error", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const element = getByText(/Login/i);
    expect(element).toBeInTheDocument();
  });
});

describe("Login", () => {
  test("it should show error message when bad details are entered", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const emailInput = getById(component.container, "email");
    const passwordInput = getById(component.container, "password");

    fireEvent.change(emailInput, { target: { value: "chuck" } });
    fireEvent.change(passwordInput, { target: { value: "chuck" } });

    expect(component.getAllByText(/Invalid/i).length).toBe(2);
  });
});

describe("Login", () => {
  test("it should not show any error message when all fields are valid", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const emailInput = getById(component.container, "email");
    const passwordInput = getById(component.container, "password");

    fireEvent.change(emailInput, { target: { value: "chuck@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "chucknorris1235" } });

    expect(component.queryByText(/Invalid/i)).toBeNull();
  });
});

describe("Login", () => {
  test("it should show error message when bad email is submitted", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const emailInput = getById(component.container, "email");
    const passwordInput = getById(component.container, "password");

    fireEvent.change(emailInput, { target: { value: "chuck" } });
    fireEvent.change(passwordInput, { target: { value: "chucknorris" } });
    fireEvent.click(component.getByText(/login/i));

    expect(component.getByText(/email/i).textContent).toContain(
      "Valid email is required"
    );
  });
});

describe("Login", () => {
  test("it should show error message when credentials are not correct", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const emailInput = getById(component.container, "email");
    const passwordInput = getById(component.container, "password");

    fireEvent.change(emailInput, { target: { value: "chuck@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "chucknorris" } });
    fireEvent.click(component.getByText(/login/i));

    expect(component.getByText(/account/i).textContent).toContain(
      "Account not found"
    );
  });
});
