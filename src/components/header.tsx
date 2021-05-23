import React from "react";
import { Link } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { useRestaurants } from "../hooks/useRestaurants";
import { Logo, LogoLocation } from "./logo";
import { NavSideBar } from "./nav-side-bar";
import { SearchBar } from "./search-bar";

export const Header: React.FC = () => {
  const { data: loginUserData } = useLoginUser();
  const { data: restaurantsData } = useRestaurants();

  return (
    <header className="py-5 px-10">
      <div className="flex justify-between items-center">
        <div className="flex py-3">
          <NavSideBar data={loginUserData} />
          <Link to="/">
            <Logo where={LogoLocation.Header} />
          </Link>
        </div>
        <SearchBar />
      </div>
    </header>
  );
};
