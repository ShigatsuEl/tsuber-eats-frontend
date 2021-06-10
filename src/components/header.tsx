import React from "react";
import { Link } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { UserRole } from "../__generated__/globalTypes";
import { Logo, LogoLocation } from "./logo";
import { NavSideBar } from "./nav-side-bar";
import { SearchBar } from "./search-bar";

export const Header: React.FC = () => {
  const { data: loginUserData } = useLoginUser();

  return (
    <header className="py-5 px-10">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex py-3">
          <NavSideBar data={loginUserData} />
          <Link to="/">
            <Logo where={LogoLocation.Header} />
          </Link>
        </div>
        {loginUserData?.loginUser.role !== UserRole.Delivery && <SearchBar />}
      </div>
    </header>
  );
};
