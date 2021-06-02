/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyRestaurantsQuery
// ====================================================

export interface GetMyRestaurantsQuery_getMyRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetMyRestaurantsQuery_getMyRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetMyRestaurantsQuery_getMyRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetMyRestaurantsQuery_getMyRestaurants {
  __typename: "GetMyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  restaurants: GetMyRestaurantsQuery_getMyRestaurants_restaurants[];
}

export interface GetMyRestaurantsQuery {
  getMyRestaurants: GetMyRestaurantsQuery_getMyRestaurants;
}
