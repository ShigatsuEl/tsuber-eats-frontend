import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LoggedOutRouter } from "../logged-out-router";

jest.mock("../../pages/login", () => {
  return {
    LogIn: () => <span>LogIn</span>,
  };
});
jest.mock("../../pages/create-account", () => {
  return {
    CreateAccount: () => <span>Create Account</span>,
  };
});

describe("<LoggedOutRouter />", () => {
  it("should render OK", () => {
    const { getByText } = render(
      <BrowserRouter>
        <LoggedOutRouter />
      </BrowserRouter>
    );
    getByText("LogIn");
  });
});
