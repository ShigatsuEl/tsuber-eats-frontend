/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Dish } from "../../components/dish";
import Loading from "../../components/loading";
import { Victory } from "../../components/victory";
import {
  DETAIL_ORDER_FRAGMENT,
  DISH_FRAGMENT,
  ORDER_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import {
  GetOwnerRestaurantQuery,
  GetOwnerRestaurantQueryVariables,
} from "../../__generated__/GetOwnerRestaurantQuery";
import { OnPendingOrders } from "../../__generated__/OnPendingOrders";

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

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription OnPendingOrders {
    pendingOrders {
      ...DetailOrderResults
    }
  }
  ${DETAIL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const OwnerRestaurant = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
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
  const { data: subscriptionData } = useSubscription<OnPendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );

  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData]);

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
            <div className="flex flex-wrap">
              <Link
                to={`/restaurant/${id}/dish/create`}
                className="mr-8 mb-5 text-white bg-gray-800 py-3 px-10 sm:mb-0"
              >
                Add Dish &rarr;
              </Link>
              <Link to={``} className="text-white bg-lime-600 py-3 px-10">
                Buy Promotion &rarr;
              </Link>
            </div>
            <div className="mt-10">
              {data?.getOwnerRestaurant.restaurant?.menu.length !== 0 && (
                <div className="grid-container mb-5">
                  {data?.getOwnerRestaurant.restaurant?.menu.map(
                    (dish, index) => (
                      <Dish
                        key={index}
                        id={dish.id}
                        name={dish.name}
                        price={dish.price}
                        description={dish.description}
                        restaurantId={data.getOwnerRestaurant.restaurant?.id}
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
