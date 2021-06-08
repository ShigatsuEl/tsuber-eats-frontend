import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Dish } from "../../components/dish";
import Loading from "../../components/loading";
import { Victory } from "../../components/victory";
import {
  DISH_FRAGMENT,
  ORDER_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import {
  GetOwnerRestaurantQuery,
  GetOwnerRestaurantQueryVariables,
} from "../../__generated__/GetOwnerRestaurantQuery";

export const GET_OWNER_RESTAURANT_QUERY = gql`
  query GetOwnerRestaurantQuery($input: GetOwnerRestaurantInput!) {
    getOwnerRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantResults
        menu {
          ...DishResults
        }
        orders {
          ...OrderResults
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const OwnerRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data, loading } = useQuery<
    GetOwnerRestaurantQuery,
    GetOwnerRestaurantQueryVariables
  >(GET_OWNER_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <HelmetProvider>
            <title>
              {data?.getOwnerRestaurant.restaurant?.name} | Tsuber Eats
            </title>
          </HelmetProvider>
          <div
            data-testid="restaurant-coverImg"
            className="relative py-40 px-10 bg-cover bg-center bg-gray-800"
            style={{
              backgroundImage: `url(${data?.getOwnerRestaurant.restaurant?.coverImg})`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 px-10 pb-5 text-white bg-gradient-to-t from-black">
              <h4
                data-testid="restaurant-name"
                className="pb-2 font-semibold text-4xl"
              >
                {data?.getOwnerRestaurant.restaurant?.name || "Loading..."}
              </h4>
              <h5
                data-testid="restuarant-address"
                className="flex items-center text-xl"
              >
                {data?.getOwnerRestaurant.restaurant?.address}
              </h5>
            </div>
          </div>
          <div className="mt-10 mx-10">
            <Link
              to={`/restaurant/${id}/dish/create`}
              className=" mr-8 text-white bg-gray-800 py-3 px-10"
            >
              Add Dish &rarr;
            </Link>
            <Link to={``} className=" text-white bg-lime-600 py-3 px-10">
              Buy Promotion &rarr;
            </Link>
            <div className="mt-10">
              {data?.getOwnerRestaurant.restaurant?.menu.length !== 0 && (
                <div className="grid grid-cols-1 gap-6 mb-5 sm:grid-cols-2 lg:grid-cols-3">
                  {data?.getOwnerRestaurant.restaurant?.menu.map(
                    (dish, index) => (
                      <Dish
                        key={index}
                        name={dish.name}
                        price={dish.price}
                        description={dish.description}
                      />
                    )
                  )}
                </div>
              )}
            </div>
            <div className="mt-20">
              <h4 className="font-semibold text-center text-3xl">Sales</h4>
              <Victory className="mb-10" data={data} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
