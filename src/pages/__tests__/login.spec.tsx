import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LogIn } from "../login";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockClient = createMockClient();
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
    const { debug, getByPlaceholderText, getByRole } = renderResult;
    const emailInput = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(emailInput, "test@error");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Must be entered in email format/i);
    await waitFor(() => {
      userEvent.clear(emailInput);
    });
    debug();
  });
});
