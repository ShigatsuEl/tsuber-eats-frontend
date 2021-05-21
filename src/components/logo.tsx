import React from "react";
import tsuberLogo from "../images/eats-logo.svg";

export enum LogoLocation {
  Login = "login",
  CreateAccount = "create-account",
  Header = "header",
}

interface ILogoProps {
  where: LogoLocation;
}

export const Logo: React.FC<ILogoProps> = ({ where }) => (
  <img
    src={tsuberLogo}
    alt="uber-logo"
    className={`${
      where === LogoLocation.Login || where === LogoLocation.CreateAccount
        ? "w-48 mb-10 lg:mb-16"
        : ""
    }${where === LogoLocation.Header ? "w-36" : ""}`}
  />
);
