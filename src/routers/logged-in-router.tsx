import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import Loading from "../components/loading";
import { useLoginUser } from "../hooks/useLoginUser";
import { Restaurants } from "../pages/client/restauratns";

const ClientRouter = [
  <Route key="1" path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, error, loading } = useLoginUser();
  if (!data || loading || error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.loginUser.role === "Client" && ClientRouter}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
