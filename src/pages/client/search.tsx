import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import Loading from "../../components/loading";
import { RestaurantContainer } from "../../components/restaurant-container";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  SearchRestaurantQuery,
  SearchRestaurantQueryVariables,
} from "../../__generated__/SearchRestaurantQuery";

const SEARCH_RESTAURANT_QUERY = gql`
  query SearchRestaurantQuery($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantResults
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const [searchRestaurant, { data, loading, called }] = useLazyQuery<
    SearchRestaurantQuery,
    SearchRestaurantQueryVariables
  >(SEARCH_RESTAURANT_QUERY);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    searchRestaurant({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
    console.log(loading, data, called);
  }, [called, data, history, loading, location, searchRestaurant]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Search | Tsuber Eats</title>
      </Helmet>
      {loading && !called ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 mx-10 mb-5 sm:grid-cols-2 lg:grid-cols-3">
          {data?.searchRestaurant.results?.map((restaurant) => (
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
    </React.Fragment>
  );
};
