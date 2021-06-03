/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishResults
// ====================================================

export interface DishResults_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishResults_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: DishResults_options_choices[] | null;
}

export interface DishResults {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: DishResults_options[] | null;
}
