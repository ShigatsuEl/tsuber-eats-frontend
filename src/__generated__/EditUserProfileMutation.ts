/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditUserProfileMutation
// ====================================================

export interface EditUserProfileMutation_editUserProfile {
  __typename: "EditUserProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface EditUserProfileMutation {
  editUserProfile: EditUserProfileMutation_editUserProfile;
}

export interface EditUserProfileMutationVariables {
  editUserProfileInput: EditUserProfileInput;
}
