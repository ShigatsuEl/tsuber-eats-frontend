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
import { Dashboard } from "../pages/driver/dashboard";
import { LogOut } from "../pages/logout";
import { Order } from "../pages/order";
import { CreateDish } from "../pages/owner/create-dish";
import { CreateRestaurant } from "../pages/owner/create-restaurant";
import { EditDish } from "../pages/owner/edit-dish";
import { OwnerRestaurant } from "../pages/owner/owner-restaurant";
import { OwnerRestaurants } from "../pages/owner/owner-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { MyProfile } from "../pages/user/my-profile";
import { UserRole } from "../__generated__/globalTypes";

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
  {
    path: "/orders/:id",
    component: <Order />,
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
    component: <OwnerRestaurants />,
  },
  {
    path: "/restaurant/create",
    component: <CreateRestaurant />,
  },
  {
    path: "/restaurant/:id",
    component: <OwnerRestaurant />,
  },
  {
    path: "/restaurant/:id/dish/create",
    component: <CreateDish />,
  },
  {
    path: "/restaurant/:id/dish/edit/:dishId",
    component: <EditDish />,
  },
];

const DriverRouter = [
  {
    path: "/",
    component: <Dashboard />,
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
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        ))}
        {data.loginUser.role === UserRole.Client &&
          ClientRouter.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.loginUser.role === UserRole.Owner &&
          OwnerRouter.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        {data.loginUser.role === UserRole.Delivery &&
          DriverRouter.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.component}
            </Route>
          ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
