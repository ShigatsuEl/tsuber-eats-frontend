/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: DetailOrderResults
// ====================================================

export interface DetailOrderResults_customer {
  __typename: "User";
  email: string;
}

export interface DetailOrderResults_driver {
  __typename: "User";
  email: string;
}

export interface DetailOrderResults_restaurant {
  __typename: "Restaurant";
  name: string;
}

export interface DetailOrderResults {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  customer: DetailOrderResults_customer | null;
  driver: DetailOrderResults_driver | null;
  restaurant: DetailOrderResults_restaurant | null;
}
