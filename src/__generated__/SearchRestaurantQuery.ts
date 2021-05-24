/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchRestaurantQuery
// ====================================================

export interface SearchRestaurantQuery_searchRestaurant_results_category {
  __typename: "Category";
  name: string;
}

export interface SearchRestaurantQuery_searchRestaurant_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: SearchRestaurantQuery_searchRestaurant_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface SearchRestaurantQuery_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: SearchRestaurantQuery_searchRestaurant_results[] | null;
}

export interface SearchRestaurantQuery {
  searchRestaurant: SearchRestaurantQuery_searchRestaurant;
}

export interface SearchRestaurantQueryVariables {
  input: SearchRestaurantInput;
}
