import { useQuery } from "@apollo/client";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../../components/loading";
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
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            className="relative py-40 px-10 bg-cover bg-center bg-gray-800"
            style={{
              backgroundImage: `url(${data?.getRestaurant.restaurant?.coverImg})`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 px-10 pb-5 text-white bg-gradient-to-t from-black">
              <h4 className="pb-2 font-semibold text-4xl">
                {data?.getRestaurant.restaurant?.name}
              </h4>
              <span className="group">
                <FontAwesomeIcon icon={faUtensils} />
                <Link
                  to={`/category/${data?.getRestaurant.restaurant?.category?.name}`}
                  className="mx-3 capitalize group-hover:text-lime-600"
                >
                  {data?.getRestaurant.restaurant?.category?.name}
                </Link>
              </span>
              <h5 className="flex items-center text-xl">
                {data?.getRestaurant.restaurant?.address}
              </h5>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
