import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  GetCategoryQuery,
  GetCategoryQueryVariables,
} from "../../__generated__/GetCategoryQuery";

const GET_CATEGORY_QUERY = gql`
  query GetCategoryQuery($input: GetCategoryInput!) {
    getCategory(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...CategoryResults
      }
      restaurants {
        ...RestaurantResults
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const { slug } = useParams<ICategoryParams>();
  const { data, loading } = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GET_CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug,
      },
    },
  });

  console.log(data);
  return <h1>Category</h1>;
};