import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {
  GetAllRestaurantsQuery,
  GetAllRestaurantsQueryVariables,
} from "../../__generated__/GetAllRestaurantsQuery";

const GET_ALL_RESTAURANTS_QUERY = gql`
  query GetAllRestaurantsQuery($input: GetRestaurantsInput!) {
    getAllCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    getAllRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    GetAllRestaurantsQuery,
    GetAllRestaurantsQueryVariables
  >(GET_ALL_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return <h1>Restaurants</h1>;
};
