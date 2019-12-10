import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByAttribute
} from "@testing-library/react";
import { Provider } from "react-redux";

import EditRole from "../../../../components/Dashboard/EditRole";
import configureStore from "../../../../store/configureStore";

let store = configureStore();

afterEach(cleanup);

describe("EditRole", () => {
  test("it should render content without error", () => {
    const { getByText } = render(
      <Provider store={store}>
        <EditRole match={{ params: { id: 10001 } }} />
      </Provider>
    );

    const element = getByText(/Edit Role/i);
    expect(element).toBeInTheDocument();
  });
});

describe("EditRole", () => {
  test("it should pre-populate name", () => {
    const component = render(
      <Provider store={store}>
        <EditRole match={{ params: { id: 10001 } }} />
      </Provider>
    );

    const getById = queryByAttribute.bind(null, "id");

    const firstName = getById(component.container, "roleName");

    expect(firstName.value.length).toBeGreaterThanOrEqual(2);
  });
});

describe("EditRole", () => {
  test("it should update role and show modal confirmation when valid data is submitted", () => {
    const component = render(
      <Provider store={store}>
        <EditRole match={{ params: { id: 10001 } }} />
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

    expect(component.getByText(/updated/i).textContent).toContain(
      "Role successfully updated"
    );
  });
});
