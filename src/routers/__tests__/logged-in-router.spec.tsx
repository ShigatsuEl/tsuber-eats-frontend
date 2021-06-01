import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LoggedInRouter } from "../logged-in-router";
import { useLoginUser } from "../../hooks/useLoginUser";

jest.mock("../../pages/client/restaurants", () => {
  return {
    Restaurants: () => <span>Restaurants</span>,
  };
});
jest.mock("../../pages/user/confirm-email", () => {
  return {
    ConfirmEmail: () => <span>Confirm Email</span>,
  };
});
jest.mock("../../pages/client/search", () => {
  return {
    Search: () => <span>Search</span>,
  };
});
jest.mock("../../pages/user/my-profile", () => {
  return {
    MyProfile: () => <span>My Profile</span>,
  };
});
jest.mock("../../pages/user/edit-profile", () => {
  return {
    EditProfile: () => <span>Edit Profile</span>,
  };
});
jest.mock("../../pages/client/category", () => {
  return {
    Category: () => <span>Category</span>,
  };
});
jest.mock("../../pages/client/restaurant", () => {
  return {
    Restaurant: () => <span>Restaurant</span>,
  };
});

jest.mock("../../components/loading", () => {
  return {
    __esModule: true,
    default: () => <span>Loading</span>,
  };
});

jest.mock("../../hooks/useLoginUser", () => {
  return {
    useLoginUser: jest.fn(),
  };
});

describe("<LoggedInRouter />", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should render Loading", () => {
    (useLoginUser as jest.Mock).mockImplementation(() => ({
      data: null,
      loading: true,
      error: "error",
    }));
    const { getByText } = render(
      <BrowserRouter>
        <LoggedInRouter />
      </BrowserRouter>
    );
    getByText("Loading");
  });

  it("should render OK", () => {
    (useLoginUser as jest.Mock).mockImplementation(() => ({
      data: {
        loginUser: {
          role: "Client",
        },
      },
      loading: false,
      error: null,
    }));
    const { getByText } = render(
      <BrowserRouter>
        <LoggedInRouter />
      </BrowserRouter>
    );
    getByText("Restaurants");
  });
});
