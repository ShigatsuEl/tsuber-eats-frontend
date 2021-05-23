import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
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

export const useRestaurants = () => {
  return useQuery<GetAllRestaurantsQuery, GetAllRestaurantsQueryVariables>(
    GET_ALL_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );
};
