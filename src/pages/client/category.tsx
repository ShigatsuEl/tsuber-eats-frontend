import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import Loading from "../../components/loading";
import { RestaurantContainer } from "../../components/restaurant-container";
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

  return (
    <React.Fragment>
      <Helmet>
        <title>Category | Tsuber Eats</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 mx-10 mb-5 sm:grid-cols-2 lg:grid-cols-3">
          {data?.getCategory.restaurants?.map((restaurant) => (
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
