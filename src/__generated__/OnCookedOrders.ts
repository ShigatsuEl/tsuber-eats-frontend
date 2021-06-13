/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: OnCookedOrders
// ====================================================

export interface OnCookedOrders_cookedOrders_customer {
  __typename: "User";
  email: string;
}

export interface OnCookedOrders_cookedOrders_driver {
  __typename: "User";
  email: string;
}

export interface OnCookedOrders_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OnCookedOrders_cookedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: OnCookedOrders_cookedOrders_customer | null;
  driver: OnCookedOrders_cookedOrders_driver | null;
  restaurant: OnCookedOrders_cookedOrders_restaurant | null;
}

export interface OnCookedOrders {
  cookedOrders: OnCookedOrders_cookedOrders;
}
