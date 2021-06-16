/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { DETAIL_ORDER_FRAGMENT } from "../fragments";
import { useLoginUser } from "../hooks/useLoginUser";
import {
  EditOrderMutation,
  EditOrderMutationVariables,
} from "../__generated__/EditOrderMutation";
import {
  GetOrderQuery,
  GetOrderQueryVariables,
} from "../__generated__/GetOrderQuery";
import { OrderStatus, UserRole } from "../__generated__/globalTypes";
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

const EDIT_ORDER_MUTATION = gql`
  mutation EditOrderMutation($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
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
  const { data: userData } = useLoginUser();
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
  const [editOrder] =
    useMutation<EditOrderMutation, EditOrderMutationVariables>(
      EDIT_ORDER_MUTATION
    );

  const onOwnerBtnClick = (newStatus: OrderStatus) => {
    editOrder({
      variables: {
        input: {
          id: +id,
          status: newStatus,
        },
      },
    });
  };

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
    <div className="flex justify-center mt-4 mx-auto px-10 container lg:mt-12">
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
          {userData?.loginUser.role === UserRole.Client && (
            <span className="text-center text-2xl text-lime-600">
              Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.loginUser.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button
                  onClick={() => onOwnerBtnClick(OrderStatus.Cooking)}
                  className="btn"
                >
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button
                  onClick={() => onOwnerBtnClick(OrderStatus.Cooked)}
                  className="btn"
                >
                  Order Cooked
                </button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Pending &&
                data?.getOrder.order?.status !== OrderStatus.Cooking && (
                  <span className="text-center text-2xl text-lime-600">
                    Status: {data?.getOrder.order?.status}
                  </span>
                )}
            </>
          )}
          {userData?.loginUser.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button
                  onClick={() => onOwnerBtnClick(OrderStatus.PickedUp)}
                  className="btn"
                >
                  Picked Up
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <button
                  onClick={() => onOwnerBtnClick(OrderStatus.Delivered)}
                  className="btn"
                >
                  Delivered
                </button>
              )}
            </>
          )}
          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className=" text-center text-2xl text-lime-600">
              Thank you for using Tsuber Eats
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
