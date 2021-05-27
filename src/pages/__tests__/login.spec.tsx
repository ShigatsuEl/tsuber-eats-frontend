import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LogIn, LOGIN_MUTATION } from "../login";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <Router>
            <HelmetProvider>
              <LogIn />
            </HelmetProvider>
          </Router>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Tsuber Eats");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(emailInput, "test@error");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Must be entered in email format/i);
    await waitFor(() => {
      userEvent.clear(emailInput);
    });
    expect(errorMessage).toHaveTextContent(/Email is required/i);
  });

  it("should display password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(emailInput, "test@error.com");
      userEvent.click(submitBtn);
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  it("should submit form and call mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "test@test.com",
      password: "test",
    };
    const mutationHandler = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "token",
          error: null,
        },
      },
    });
    mockClient.setRequestHandler(LOGIN_MUTATION, mutationHandler);
    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mutationHandler).toHaveBeenCalledTimes(1);
    expect(mutationHandler).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
