/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantResults
// ====================================================

export interface RestaurantResults_category {
  __typename: "Category";
  name: string;
}

export interface RestaurantResults {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: RestaurantResults_category | null;
  address: string;
  isPromoted: boolean;
}
