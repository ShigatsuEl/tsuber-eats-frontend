/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditedUser
// ====================================================

export interface EditedUser_location {
  __typename: "UserLocation";
  latitude: number;
  longitude: number;
}

export interface EditedUser {
  __typename: "User";
  email: string;
  verified: boolean;
  location: EditedUser_location | null;
}
