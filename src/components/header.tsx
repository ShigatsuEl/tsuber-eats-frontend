import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { Logo, LogoLocation } from "./logo";

export const Header: React.FC = () => {
  const { data } = useLoginUser();
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="py-5 px-10">
      <div className="flex items-center">
        <div className="flex py-3">
          {/* <Link to="/profile">
            <FontAwesomeIcon icon={faBars} className="mr-9 text-lg" />
          </Link> */}
          <>
            {/* Sidebar Overlay */}
            <div
              onClick={() => setIsSidebarOpen(false)}
              className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 block ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            />

            <div>
              <button
                className="btn-menu"
                onClick={(): void => setIsSidebarOpen(true)}
                type="button"
              >
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
              </button>
            </div>

            {/* Sidebar */}
            <div
              className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 ${
                isSidebarOpen
                  ? "ease-out translate-x-0"
                  : "ease-in -translate-x-full"
              }`}
            >
              <div className="flex items-center justify-center mt-10 text-center py-6">
                <span className="mx-2 text-2xl font-semibold text-black">
                  react-minimal-side-navigation
                </span>
              </div>

              <Navigation
                activeItemId={location.pathname}
                onSelect={({ itemId }) => {
                  history.push(itemId);
                }}
                items={[
                  {
                    title: "Home",
                    itemId: "/home",
                    elemBefore: () => (
                      <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                    ),
                  },
                  {
                    title: "About",
                    itemId: "/about",
                    elemBefore: () => (
                      <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                    ),
                    subNav: [
                      {
                        title: "Projects",
                        itemId: "/about/projects",
                      },
                      {
                        title: "Members",
                        itemId: "/about/members",
                      },
                    ],
                  },
                  {
                    title: "Another Tab",
                    itemId: "/another",
                    subNav: [
                      {
                        title: "Teams",
                        itemId: "/another/teams",
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
                      title: "Settings",
                      itemId: "/settings",
                      elemBefore: () => (
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
                      ),
                    },
                  ]}
                  onSelect={({ itemId }) => {
                    history.push(itemId);
                  }}
                />
              </div>
            </div>
          </>
          <Logo where={LogoLocation.Header} />
        </div>
      </div>
    </header>
  );
};
