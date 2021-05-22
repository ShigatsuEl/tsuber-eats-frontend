import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useHistory, useLocation } from "react-router";
import { Logo, LogoLocation } from "./logo";

export const NavSideBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`side-bar-overlay ${isSidebarOpen ? "block" : "hidden"}`}
      />

      <div>
        <button
          className="mr-9"
          onClick={(): void => setIsSidebarOpen(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faBars} className="text-lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`side-bar ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center mt-10 text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            <Logo where={LogoLocation.Header} />
          </span>
        </div>

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            if (itemId.indexOf("/") !== 0) {
              history.push(itemId);
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
                  title: "My Profile",
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
      </div>
    </>
  );
};
