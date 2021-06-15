/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: OnPendingOrders
// ====================================================

export interface OnPendingOrders_pendingOrders_customer_location {
  __typename: "UserLocation";
  latitude: number;
  longitude: number;
}

export interface OnPendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
  location: OnPendingOrders_pendingOrders_customer_location | null;
}

export interface OnPendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface OnPendingOrders_pendingOrders_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface OnPendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: OnPendingOrders_pendingOrders_customer | null;
  driver: OnPendingOrders_pendingOrders_driver | null;
  restaurant: OnPendingOrders_pendingOrders_restaurant | null;
}

export interface OnPendingOrders {
  pendingOrders: OnPendingOrders_pendingOrders;
}
