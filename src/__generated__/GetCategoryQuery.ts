/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCategoryQuery
// ====================================================

export interface GetCategoryQuery_getCategory_results {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface GetCategoryQuery_getCategory_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface GetCategoryQuery_getCategory_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: GetCategoryQuery_getCategory_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface GetCategoryQuery_getCategory {
  __typename: "GetCategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: GetCategoryQuery_getCategory_results | null;
  restaurants: GetCategoryQuery_getCategory_restaurants[] | null;
}

export interface GetCategoryQuery {
  getCategory: GetCategoryQuery_getCategory;
}

export interface GetCategoryQueryVariables {
  input: GetCategoryInput;
}
