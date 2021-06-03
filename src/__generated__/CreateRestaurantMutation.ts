/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRestaurantMutation
// ====================================================

export interface CreateRestaurantMutation_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurantId: number;
}

export interface CreateRestaurantMutation {
  createRestaurant: CreateRestaurantMutation_createRestaurant;
}

export interface CreateRestaurantMutationVariables {
  input: CreateRestaurantInput;
}
