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
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { MyProfile } from "../pages/user/my-profile";

const ClientRouter = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/search" exact>
    <Search />
  </Route>,
  <Route key={4} path="/profile/me" exact>
    <MyProfile />
  </Route>,
  <Route key={5} path="/profile/edit" exact>
    <EditProfile />
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
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
};
