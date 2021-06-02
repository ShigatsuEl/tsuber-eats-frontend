import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { authTokenVar, client, isLoggedInVar } from "../apollo";
import Loading from "../components/loading";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LogOut = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
    client.clearStore();
    history.push("/");
  }, [history]);

  return <Loading />;
};
