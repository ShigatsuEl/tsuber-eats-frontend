/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { DETAIL_ORDER_FRAGMENT } from "../fragments";
import {
  GetOrderQuery,
  GetOrderQueryVariables,
} from "../__generated__/GetOrderQuery";
import { OnUpdateOrders } from "../__generated__/OnUpdateOrders";

export const GET_ORDER_QUERY = gql`
  query GetOrderQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...DetailOrderResults
      }
    }
  }
  ${DETAIL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription OnUpdateOrders($input: UpdateOrderInput!) {
    updateOrders(input: $input) {
      ...DetailOrderResults
    }
  }
  ${DETAIL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const { id } = useParams<IParams>();
  const { data, subscribeToMore } = useQuery<
    GetOrderQuery,
    GetOrderQueryVariables
  >(GET_ORDER_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +id,
          },
        },
        // subscriptionData의 타입을 정해주지 않으면 useQuery를 했을 때의 결과값과 타입을 동일하게 여긴다
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: OnUpdateOrders } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.updateOrders,
              },
            },
          };
        },
      });
    }
  }, [data]);

  return (
    <div className="flex justify-center mt-4 px-10 container lg:mt-12">
      <Helmet>
        <title>Order #{id} | Tsuber Eats</title>
      </Helmet>
      <div className="flex flex-col justify-center border border-gray-800 w-full max-w-screen-sm">
        <h4 className="w-full py-5 font-semibold text-white text-center text-xl bg-black">
          Order #{id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center">
          ${data?.getOrder.order?.total}
        </h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Ready to pick up"}
            </span>
          </div>
          <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
            Status: {data?.getOrder.order?.status}
          </span>
        </div>
      </div>
    </div>
  );
};
