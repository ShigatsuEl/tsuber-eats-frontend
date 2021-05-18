import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutrRouter = () => {
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={() => isLoggedInVar(true)}>Click to Login</button>
    </div>
  );
};
