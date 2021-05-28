import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";
import { NavSideBar } from "../nav-side-bar";

describe("<NavSideBar />", () => {
  it("should render OK", () => {
    const { getByText } = render(
      <NavSideBar
        data={{
          loginUser: {
            __typename: "User",
            id: 1,
            email: "test@test.com",
            role: UserRole.Client,
            verified: false,
          },
        }}
      />
    );
    getByText("Profile");
  });

  it("should display email verification request", () => {
    const { getByRole } = render(
      <NavSideBar
        data={{
          loginUser: {
            __typename: "User",
            id: 1,
            email: "test@test.com",
            role: UserRole.Client,
            verified: false,
          },
        }}
      />
    );
    const isVerifiedElement = getByRole("alertdialog");
    expect(isVerifiedElement).toHaveTextContent(/Please verify your email/i);
  });

  it("should not display email verification request", () => {
    const { queryByRole } = render(
      <NavSideBar
        data={{
          loginUser: {
            __typename: "User",
            id: 1,
            email: "test@test.com",
            role: UserRole.Client,
            verified: true,
          },
        }}
      />
    );
    const isVerifiedElement = queryByRole("alertdialog");
    expect(isVerifiedElement).toBeNull();
  });

  it("should display or hide sidebar", async () => {
    const { getByRole, getByTestId } = render(
      <NavSideBar
        data={{
          loginUser: {
            __typename: "User",
            id: 1,
            email: "test@test.com",
            role: UserRole.Client,
            verified: false,
          },
        }}
      />
    );
    const sideBarBtn = getByRole("button");
    await waitFor(() => {
      userEvent.click(sideBarBtn);
    });
    const sideBar = getByTestId("side-bar");
    const sideBarOverlay = getByTestId("side-bar-overlay");
    expect(sideBar).toHaveClass("ease-out translate-x-0");
    expect(sideBarOverlay).toHaveClass("block");
    await waitFor(() => {
      userEvent.click(sideBarOverlay);
    });
    expect(sideBar).toHaveClass("ease-in -translate-x-full");
    expect(sideBarOverlay).toHaveClass("hidden");
  });
});
