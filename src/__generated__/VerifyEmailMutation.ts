/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyEmailMutation
// ====================================================

export interface VerifyEmailMutation_verifyEmail {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  error: string | null;
}

export interface VerifyEmailMutation {
  verifyEmail: VerifyEmailMutation_verifyEmail;
}

export interface VerifyEmailMutationVariables {
  verifyEmailInput: VerifyEmailInput;
}
