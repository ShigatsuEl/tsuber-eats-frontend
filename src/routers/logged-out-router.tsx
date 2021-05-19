import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { LogIn } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <LogIn />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
};
