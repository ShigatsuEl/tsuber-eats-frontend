import React from "react";
import { GetAllRestaurantsQuery } from "../__generated__/GetAllRestaurantsQuery";

interface IRestaurantListProps {
  data?: GetAllRestaurantsQuery;
}

export const RestaurantList: React.FC<IRestaurantListProps> = ({ data }) => {
  return (
    <>
      {data?.getAllRestaurants.results?.map((restaurant) => (
        <div key={restaurant.id}>
          <div
            className="mb-3 py-28 bg-cover bg-center"
            style={{ backgroundImage: `url(${restaurant.coverImg})` }}
          ></div>
          <div className="flex justify-between border-b pb-1">
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <span className="capitalize">{restaurant.category?.name}</span>
          </div>
          <span className="inline-block pt-1 capitalize">
            {restaurant.address}
          </span>
        </div>
      ))}
    </>
  );
};
