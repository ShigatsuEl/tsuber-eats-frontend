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

export interface GetRestaurantQuery_getRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface GetRestaurantQuery_getRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: GetRestaurantQuery_getRestaurant_restaurant_menu_options_choices[] | null;
}

export interface GetRestaurantQuery_getRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: GetRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
}

export interface GetRestaurantQuery_getRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetRestaurantQuery_getRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: GetRestaurantQuery_getRestaurant_restaurant_menu[];
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
