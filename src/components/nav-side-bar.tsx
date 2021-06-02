/* eslint-disable jsx-a11y/no-redundant-roles */
import {
  faBars,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useHistory, useLocation } from "react-router";
import { LoginUserQuery } from "../__generated__/LoginUserQuery";
import { Logo, LogoLocation } from "./logo";

interface INavSideBarProps {
  data?: LoginUserQuery;
}

export const NavSideBar: React.FC<INavSideBarProps> = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {/* Sidebar Overlay */}
      <div
        data-testid="side-bar-overlay"
        onClick={() => setIsSidebarOpen(false)}
        className={`side-bar-overlay ${isSidebarOpen ? "block" : "hidden"}`}
      />

      <div>
        <button
          role="button"
          className="mr-9"
          onClick={(): void => setIsSidebarOpen(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faBars} className="text-lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        data-testid="side-bar"
        className={`side-bar ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-2 py-6">
          <div className="mx-2 text-2xl font-semibold text-black">
            <Logo where={LogoLocation.Header} />
          </div>
          <FontAwesomeIcon
            icon={faBars}
            className="absolute top-9 right-6 text-lg cursor-pointer sm:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        {!data?.loginUser.verified && (
          <div
            role="alertdialog"
            className="flex justify-center bg-lime-500 p-2"
          >
            <span className="font-semibold text-white">
              Please verify your email
            </span>
          </div>
        )}

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            if (
              itemId.match(/\//g)?.length !== 1 ||
              (itemId.match(/\//g)?.length === 1 && itemId.match(/-/g)?.length)
            ) {
              history.push(itemId);
              setIsSidebarOpen(false);
            }
          }}
          items={[
            {
              title: "Profile",
              itemId: "/profile",
              elemBefore: () => (
                <FontAwesomeIcon icon={faUser} className="text-lg" />
              ),
              subNav: [
                {
                  title: "My Information",
                  itemId: "/profile/me",
                },
                {
                  title: "Edit Profile",
                  itemId: "/profile/edit",
                },
              ],
            },
          ]}
        />
        <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Log Out",
                itemId: "/logout",
                elemBefore: () => <FontAwesomeIcon icon={faSignOutAlt} />,
              },
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
              setIsSidebarOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
};
