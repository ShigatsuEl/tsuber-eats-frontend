import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RestaurantContainer } from "../../components/restaurant-container";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { GetMyRestaurantsQuery } from "../../__generated__/GetMyRestaurantsQuery";

export const GET_MY_RESTAURANTS_QUERY = gql`
  query GetMyRestaurantsQuery {
    getMyRestaurants {
      ok
      error
      restaurants {
        ...RestaurantResults
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const { data } = useQuery<GetMyRestaurantsQuery>(GET_MY_RESTAURANTS_QUERY);

  return (
    <div>
      <HelmetProvider>
        <title>My Restaurants | Tsuber Eats</title>
      </HelmetProvider>
      <div className="mx-10">
        <h2 className="mb-5 font-semibold text-3xl">My Restaurants</h2>
        <Link to="/restaurant/create">
          <span className="link inline-block mb-5 font-medium text-base">
            Create Restaurant &rarr;
          </span>
        </Link>
        {data?.getMyRestaurants.ok &&
          data.getMyRestaurants.restaurants.length !== 0 && (
            <div className="grid grid-cols-1 gap-6 mb-5 sm:grid-cols-2 lg:grid-cols-3">
              {data?.getMyRestaurants.restaurants?.map((restaurant) => (
                <RestaurantContainer
                  key={restaurant.id + ""}
                  id={restaurant.id + ""}
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name!}
                  address={restaurant.address}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};
