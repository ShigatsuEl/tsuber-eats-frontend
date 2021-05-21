import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { Logo, LogoLocation } from "./logo";

export const Header: React.FC = () => {
  const { data } = useLoginUser();
  return (
    <header className="py-5 px-10">
      <div className="flex items-center">
        <div className="flex py-3">
          <Link to="/profile">
            <FontAwesomeIcon icon={faBars} className="mr-9 text-lg" />
          </Link>
          <Logo where={LogoLocation.Header} />
        </div>
      </div>
    </header>
  );
};
