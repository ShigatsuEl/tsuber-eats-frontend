import { ApolloProvider } from "@apollo/client";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render, waitFor, RenderResult } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from "../create-account";
import { LOGIN_MUTATION } from "../login";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const actualModule = jest.requireActual("react-router-dom");
  return {
    ...actualModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() =>
      expect(document.title).toBe("Create Account | Tsuber Eats")
    );
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
      userEvent.type(emailInput, "test@error.com");
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
      role: UserRole.Client,
    };
    const createAccountMutationHandler = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "Create Account Mutation Error",
        },
      },
    });
    const loginMutationHandler = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "token",
          error: "Login Mutation Error",
        },
      },
    });
    mockClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      createAccountMutationHandler
    );
    mockClient.setRequestHandler(LOGIN_MUTATION, loginMutationHandler);
    await waitFor(() => {
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(submitBtn);
    });
    expect(createAccountMutationHandler).toHaveBeenCalledTimes(1);
    expect(createAccountMutationHandler).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Create Account Mutation Error/i);
    expect(loginMutationHandler).toHaveBeenCalledTimes(1);
    expect(loginMutationHandler).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
