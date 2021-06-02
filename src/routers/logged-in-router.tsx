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
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { LogOut } from "../pages/logout";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { MyProfile } from "../pages/user/my-profile";

const UserRouter = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/logout",
    component: <LogOut />,
  },
  {
    path: "/profile/me",
    component: <MyProfile />,
  },
  {
    path: "/profile/edit",
    component: <EditProfile />,
  },
];

const ClientRouter = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurant/:id",
    component: <Restaurant />,
  },
];

const OwnerRouter = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
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
        {UserRouter.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        {data.loginUser.role === "Client" &&
          ClientRouter.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.loginUser.role === "Owner" &&
          OwnerRouter.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
