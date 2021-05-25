import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import Loading from "../../components/loading";
import { Pagination } from "../../components/pagination";
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
  const [page, setPage] = useState(1);
  const { slug } = useParams<ICategoryParams>();
  const { data, loading } = useQuery<
    GetCategoryQuery,
    GetCategoryQueryVariables
  >(GET_CATEGORY_QUERY, {
    variables: {
      input: {
        page,
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
        <React.Fragment>
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
          <div className="flex justify-center items-center mb-5">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.getCategory.totalPages!}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
