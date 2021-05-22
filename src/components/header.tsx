import React from "react";
import { useLoginUser } from "../hooks/useLoginUser";
import { Logo, LogoLocation } from "./logo";
import { NavSideBar } from "./nav-side-bar";

export const Header: React.FC = () => {
  const { data } = useLoginUser();

  return (
    <header className="py-5 px-10">
      <div className="flex items-center">
        <div className="flex py-3">
          <NavSideBar data={data} />
          <Logo where={LogoLocation.Header} />
        </div>
      </div>
    </header>
  );
};
