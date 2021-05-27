import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LOGIN_USER_QUERY } from "../../hooks/useLoginUser";
import { Header } from "../header";

jest.mock("../nav-side-bar", () => {
  return {
    NavSideBar: () => <span>Nav-Side-Bar</span>,
  };
});

jest.mock("../search-bar", () => {
  return {
    SearchBar: () => <span>Search-Bar</span>,
  };
});

const mocks = [
  {
    request: {
      query: LOGIN_USER_QUERY,
    },
    result: {
      data: {
        loginUser: {
          id: 1,
          email: "",
          role: "",
          verified: false,
        },
      },
    },
  },
];

describe("<Header />", () => {
  it("should render OK", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider mocks={mocks}>
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});
