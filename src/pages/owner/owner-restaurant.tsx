import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryZoomContainerProps,
} from "victory";
import { Dish } from "../../components/dish";
import Loading from "../../components/loading";
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
  const [zoomDomain, setZoomDomain] = useState<
    VictoryZoomContainerProps["zoomDomain"]
  >({
    x: [new Date(2000, 1, 1), new Date(2020, 12, 30)],
  });
  console.log(data);
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
              <div className="mb-40">
                <VictoryChart
                  width={window.innerWidth}
                  height={470}
                  theme={VictoryTheme.material}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      zoomDimension="x"
                      zoomDomain={zoomDomain}
                      onZoomDomainChange={(domain) =>
                        setZoomDomain(() => domain)
                      }
                    />
                  }
                >
                  <VictoryLine
                    labels={({ datum }) => `(￦)${datum.y}`}
                    labelComponent={
                      <VictoryLabel
                        renderInPortal
                        style={{ fontSize: 18, opacity: 0.7 } as any}
                        dy={-20}
                      />
                    }
                    interpolation="natural"
                    style={{
                      data: { stroke: "#84CC16" },
                    }}
                    data={data?.getOwnerRestaurant.restaurant?.orders.map(
                      (order) => ({
                        x: order.createdAt,
                        y: order.total,
                      })
                    )}
                  />
                </VictoryChart>
                <VictoryChart
                  padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                  width={window.innerWidth}
                  height={100}
                  scale={{ x: "time" }}
                  containerComponent={
                    <VictoryBrushContainer
                      brushDimension="x"
                      brushDomain={zoomDomain}
                      onBrushDomainChange={(domain) =>
                        setZoomDomain((current) => domain)
                      }
                    />
                  }
                >
                  <VictoryAxis
                    tickFormat={(tick) => new Date(tick).getFullYear()}
                  />
                  <VictoryLine
                    style={{
                      data: { stroke: "#84CC16" },
                    }}
                    data={data?.getOwnerRestaurant.restaurant?.orders.map(
                      (order) => ({
                        x: order.createdAt,
                        y: order.total,
                      })
                    )}
                  />
                </VictoryChart>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
