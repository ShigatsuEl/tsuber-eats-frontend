import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { EditProfile, EDIT_USER_PROFILE_MUTATION } from "../edit-profile";

jest.mock("../../../hooks/useLoginUser", () => {
  return {
    useLoginUser: () => {
      return {
        data: {
          loginUser: {
            id: 1,
            email: "email",
          },
        },
      };
    },
  };
});

describe("<EditProfile />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <HelmetProvider>
              <EditProfile />
            </HelmetProvider>
          </BrowserRouter>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Edit Profile | Tsuber Eats");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.clear(emailInput);
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required/i);
    await waitFor(() => {
      userEvent.type(emailInput, "test");
    });
    expect(errorMessage).toHaveTextContent(/Must be entered in email format/i);
  });

  it("should submit form and call mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "test@gmail.com",
      password: "test",
    };
    const muationHandler = jest.fn().mockResolvedValue({
      data: {
        editUserProfile: {
          ok: true,
          error: "error",
        },
      },
    });
    mockClient.setRequestHandler(EDIT_USER_PROFILE_MUTATION, muationHandler);
    await waitFor(() => {
      userEvent.clear(emailInput);
      userEvent.type(emailInput, formData.email);
      userEvent.type(passwordInput, formData.password);
      userEvent.click(submitBtn);
    });
    expect(muationHandler).toHaveBeenCalledTimes(1);
    expect(muationHandler).toHaveBeenCalledWith({
      editUserProfileInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
