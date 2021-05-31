import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { MyProfile } from "../my-profile";

jest.mock("../../../hooks/useLoginUser", () => {
  return {
    useLoginUser: () => {
      return {
        data: {
          loginUser: {
            email: "email",
            verified: jest.fn(),
            role: "Client",
          },
        },
      };
    },
  };
});

describe("<MyProfile />", () => {
  let renderResult: RenderResult;
  it("should render OK", async () => {
    renderResult = render(
      <Router>
        <HelmetProvider>
          <MyProfile />
        </HelmetProvider>
      </Router>
    );
    await waitFor(async () => {
      expect(document.title).toBe("My Profile | Tsuber Eats");
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const { getByTestId } = renderResult;
    const emailTest = getByTestId("my-email");
    const verifiedTest = getByTestId("my-verified");
    const roleTest = getByTestId("my-role");
    expect(emailTest).toHaveTextContent("email");
    expect(verifiedTest).toHaveTextContent("O");
    expect(roleTest).toHaveTextContent("Client");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
