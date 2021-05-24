import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../fragments";
import {
  GetAllRestaurantsQuery,
  GetAllRestaurantsQueryVariables,
} from "../__generated__/GetAllRestaurantsQuery";

const GET_ALL_RESTAURANTS_QUERY = gql`
  query GetAllRestaurantsQuery($input: GetRestaurantsInput!) {
    getAllCategories {
      ok
      error
      categories {
        ...CategoryResults
      }
    }
    getAllRestaurants(input: $input) {
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
  ${CATEGORY_FRAGMENT}
`;

export const useRestaurants = () => {
  const [page, setPage] = useState(1);
  return {
    ...useQuery<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>(
      GET_ALL_RESTAURANTS_QUERY,
      {
        variables: {
          input: {
            page,
          },
        },
      }
    ),
    page,
    setPage,
  };
};
