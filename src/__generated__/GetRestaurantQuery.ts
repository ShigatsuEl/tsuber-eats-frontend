/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetRestaurantQuery
// ====================================================

export interface GetRestaurantQuery_getRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface GetRestaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetRestaurantQuery_getRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetRestaurantQuery_getRestaurant {
  __typename: "GetRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: GetRestaurantQuery_getRestaurant_restaurant | null;
}

export interface GetRestaurantQuery {
  getRestaurant: GetRestaurantQuery_getRestaurant;
}

export interface GetRestaurantQueryVariables {
  input: GetRestaurantInput;
}
