/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOwnerRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetOwnerRestaurantQuery
// ====================================================

export interface GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu_options_choices[] | null;
}

export interface GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu_options[] | null;
}

export interface GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant_menu[];
}

export interface GetOwnerRestaurantQuery_getOwnerRestaurant {
  __typename: "GetOwnerRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: GetOwnerRestaurantQuery_getOwnerRestaurant_restaurant | null;
}

export interface GetOwnerRestaurantQuery {
  getOwnerRestaurant: GetOwnerRestaurantQuery_getOwnerRestaurant;
}

export interface GetOwnerRestaurantQueryVariables {
  input: GetOwnerRestaurantInput;
}
