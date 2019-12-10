import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByAttribute
} from "@testing-library/react";
import { Provider } from "react-redux";

import CreateRole from "../../../../components/Dashboard/CreateRole";
import configureStore from "../../../../store/configureStore";

let store = configureStore();

afterEach(cleanup);

describe("CreateRole", () => {
  test("it should render content without error", () => {
    const { getByText } = render(
      <Provider store={store}>
        <CreateRole />
      </Provider>
    );

    const element = getByText(/Create Role/i);
    expect(element).toBeInTheDocument();
  });
});

describe("CreateRole", () => {
  test("it should show error message when bad details are entered", () => {
    const component = render(
      <Provider store={store}>
        <CreateRole />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const nameInput = getById(component.container, "roleName");

    fireEvent.change(nameInput, { target: { value: "a" } });

    expect(component.getByText(/Invalid/i).textContent).toBe("Invalid");
  });
});

describe("CreateRole", () => {
  test("it should show error message when no permission is submitted", () => {
    const component = render(
      <Provider store={store}>
        <CreateRole />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const nameInput = getById(component.container, "roleName");

    fireEvent.change(nameInput, { target: { value: "ATTENDANT" } });
    fireEvent.click(component.getByText(/Submit/i));

    expect(component.getByText(/Select/i).textContent).toContain(
      "Select at least one permission"
    );
  });
});

describe("CreateRole", () => {
  test("it should show error message when duplicate role name is submitted", () => {
    const component = render(
      <Provider store={store}>
        <CreateRole />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const nameInput = getById(component.container, "roleName");

    fireEvent.change(nameInput, { target: { value: "ADMIN" } });
    fireEvent.click(component.getByLabelText(/VIEW_USER/i), {
      target: { value: "VIEW_USER", checked: true }
    });
    fireEvent.click(component.getByLabelText(/CREATE_USER/i), {
      target: { value: "CREATE_USER", checked: true }
    });

    fireEvent.click(component.getByText(/Submit/i));

    expect(component.getByText(/already/i).textContent).toContain(
      "Role already exists"
    );
  });
});

describe("CreateRole", () => {
  test("it should create role and show modal confirmation when valid data is submitted", () => {
    const component = render(
      <Provider store={store}>
        <CreateRole />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const nameInput = getById(component.container, "roleName");

    fireEvent.change(nameInput, { target: { value: "ATTENDANT" } });
    fireEvent.click(component.getByLabelText(/VIEW_USER/i), {
      target: { value: "VIEW_USER", checked: true }
    });
    fireEvent.click(component.getByLabelText(/CREATE_USER/i), {
      target: { value: "CREATE_USER", checked: true }
    });

    fireEvent.click(component.getByText(/Submit/i));

    expect(component.getByText(/created/i).textContent).toContain(
      "Role successfully created"
    );
  });
});
