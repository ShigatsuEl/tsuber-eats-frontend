import React from "react";
import { useRestaurants } from "../../hooks/useRestaurants";

export const Restaurants = () => {
  const { data } = useRestaurants();
  console.log(data);
  return <h1>Restaurants</h1>;
};
