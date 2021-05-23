/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllRestaurantsQuery
// ====================================================

export interface GetAllRestaurantsQuery_getAllCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface GetAllRestaurantsQuery_getAllCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: GetAllRestaurantsQuery_getAllCategories_categories[] | null;
}

export interface GetAllRestaurantsQuery_getAllRestaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface GetAllRestaurantsQuery_getAllRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetAllRestaurantsQuery_getAllRestaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetAllRestaurantsQuery_getAllRestaurants {
  __typename: "GetRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: GetAllRestaurantsQuery_getAllRestaurants_results[] | null;
}

export interface GetAllRestaurantsQuery {
  getAllCategories: GetAllRestaurantsQuery_getAllCategories;
  getAllRestaurants: GetAllRestaurantsQuery_getAllRestaurants;
}

export interface GetAllRestaurantsQueryVariables {
  input: GetRestaurantsInput;
}
