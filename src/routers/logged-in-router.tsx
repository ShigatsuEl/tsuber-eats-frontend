import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loading from "../components/loading";
import { Restaurants } from "../pages/client/restauratns";
import { LoginUserQuery } from "../__generated__/LoginUserQuery";

const ClientRouter = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const LOGIN_USER_QUERY = gql`
  query LoginUserQuery {
    loginUser {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, error, loading } = useQuery<LoginUserQuery>(LOGIN_USER_QUERY);
  if (!data || loading || error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.loginUser.role === "Client" && ClientRouter}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
