import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const Search = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, []);

  return <h1>Search</h1>;
};
