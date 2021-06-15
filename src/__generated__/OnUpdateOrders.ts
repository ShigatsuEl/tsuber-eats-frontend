/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: OnUpdateOrders
// ====================================================

export interface OnUpdateOrders_updateOrders_customer_location {
  __typename: "UserLocation";
  latitude: number;
  longitude: number;
}

export interface OnUpdateOrders_updateOrders_customer {
  __typename: "User";
  email: string;
  location: OnUpdateOrders_updateOrders_customer_location | null;
}

export interface OnUpdateOrders_updateOrders_driver {
  __typename: "User";
  email: string;
}

export interface OnUpdateOrders_updateOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OnUpdateOrders_updateOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: OnUpdateOrders_updateOrders_customer | null;
  driver: OnUpdateOrders_updateOrders_driver | null;
  restaurant: OnUpdateOrders_updateOrders_restaurant | null;
}

export interface OnUpdateOrders {
  updateOrders: OnUpdateOrders_updateOrders;
}

export interface OnUpdateOrdersVariables {
  input: UpdateOrderInput;
}
