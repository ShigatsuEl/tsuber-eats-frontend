import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  GetRestaurantQuery,
  GetRestaurantQueryVariables,
} from "../../__generated__/GetRestaurantQuery";

const GET_RESTAURANT_QUERY = gql`
  query GetRestaurantQuery($input: GetRestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantResults
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Restaurant = () => {
  const { id: restaurantId } = useParams<IParams>();
  const { data, loading } = useQuery<
    GetRestaurantQuery,
    GetRestaurantQueryVariables
  >(GET_RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +restaurantId,
      },
    },
  });
  console.log(!loading && data);
  return <h1>Restaurant</h1>;
};
