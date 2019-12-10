import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByAttribute
} from "@testing-library/react";
import { Provider } from "react-redux";

import CreateUser from "../../../../components/Dashboard/CreateUser";
import configureStore from "../../../../store/configureStore";

let store = configureStore();

afterEach(cleanup);

describe("CreateUser", () => {
  test("it should render content without error", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    const element = getByText(/Create User/i);
    expect(element).toBeInTheDocument();
  });
});

describe("CreateUser", () => {
  test("it should not show any error message when all fields are valid", () => {
    const component = render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const firstName = getById(component.container, "firstName");
    const lastName = getById(component.container, "lastName");
    const email = getById(component.container, "email");
    const password = getById(component.container, "password");
    const confirmPassword = getById(component.container, "confirmPassword");

    fireEvent.change(firstName, { target: { value: "d" } });
    fireEvent.change(lastName, { target: { value: "d" } });
    fireEvent.change(email, { target: { value: "ch" } });
    fireEvent.change(password, { target: { value: "ch" } });
    fireEvent.change(confirmPassword, { target: { value: "ch" } });

    expect(component.queryAllByText(/Invalid/i).length).toBe(5);
  });
});

describe("CreateUser", () => {
    test("it should show error message when duplicate email is submitted", () => {
      const component = render(
        <Provider store={store}>
          <CreateUser />
        </Provider>
      );
  
      const getById = queryByAttribute.bind(null, "id");
  
      const firstName = getById(component.container, "firstName");
      const lastName = getById(component.container, "lastName");
      const email = getById(component.container, "email");
      const password = getById(component.container, "password");
      const confirmPassword = getById(component.container, "confirmPassword");
  
      fireEvent.change(firstName, { target: { value: "Kenneth" } });
      fireEvent.change(lastName, { target: { value: "Johnson" } });
      fireEvent.change(email, { target: { value: "jonsnow@gmail.com" } });
      fireEvent.change(password, { target: { value: "ken100001" } });
      fireEvent.change(confirmPassword, { target: { value: "ken100001" } });
  
      fireEvent.click(component.getByText(/Submit/i));
  
      expect(component.getByText(/already/i).textContent).toContain(
        "Email already exists"
      );
    });
  });

describe("CreateUser", () => {
  test("it should create user and show modal confirmation when valid data is submitted", () => {
    const component = render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const firstName = getById(component.container, "firstName");
    const lastName = getById(component.container, "lastName");
    const email = getById(component.container, "email");
    const password = getById(component.container, "password");
    const confirmPassword = getById(component.container, "confirmPassword");

    fireEvent.change(firstName, { target: { value: "Kenneth" } });
    fireEvent.change(lastName, { target: { value: "Johnson" } });
    fireEvent.change(email, { target: { value: "kennethjon@gmail.com" } });
    fireEvent.change(password, { target: { value: "ken100001" } });
    fireEvent.change(confirmPassword, { target: { value: "ken100001" } });

    fireEvent.click(component.getByText(/Submit/i));

    expect(component.getByText(/created/i).textContent).toContain(
      "User successfully created"
    );
  });
});
