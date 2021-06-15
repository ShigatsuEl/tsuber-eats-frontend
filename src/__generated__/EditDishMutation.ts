/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditDishMutation
// ====================================================

export interface EditDishMutation_editDish {
  __typename: "EditDishOutput";
  ok: boolean;
  error: string | null;
}

export interface EditDishMutation {
  editDish: EditDishMutation_editDish;
}

export interface EditDishMutationVariables {
  input: EditDishInput;
}
