/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwnerRestaurantsQuery
// ====================================================

export interface GetOwnerRestaurantsQuery_getOwnerRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetOwnerRestaurantsQuery_getOwnerRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetOwnerRestaurantsQuery_getOwnerRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetOwnerRestaurantsQuery_getOwnerRestaurants {
  __typename: "GetOwnerRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: GetOwnerRestaurantsQuery_getOwnerRestaurants_restaurants[];
}

export interface GetOwnerRestaurantsQuery {
  getOwnerRestaurants: GetOwnerRestaurantsQuery_getOwnerRestaurants;
}
