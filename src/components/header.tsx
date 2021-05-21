import React from "react";
import { Logo, LogoLocation } from "./logo";

export const Header = () => (
  <header className="py-5 px-10">
    <div>
      <Logo where={LogoLocation.Header} />
    </div>
  </header>
);
