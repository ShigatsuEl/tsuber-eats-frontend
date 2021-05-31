import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfirmEmail } from "../confirm-email";

jest.mock("@apollo/client", () => {
  return {
    useApolloClient: jest.fn(),
    useMutation: () => {
      return [];
    },
  };
});

jest.mock("../../../hooks/useLoginUser", () => {
  return {
    useLoginUser: () => {
      return {
        data: jest.fn(),
      };
    },
  };
});

describe("<ConfirmEmail />", () => {
  it("should render OK", async () => {
    await waitFor(async () => {
      render(
        <Router>
          <HelmetProvider>
            <ConfirmEmail />
          </HelmetProvider>
        </Router>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.title).toBe("Confirm Email | Tsuber Eats");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
