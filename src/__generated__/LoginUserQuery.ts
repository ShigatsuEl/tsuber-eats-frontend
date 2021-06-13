/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: LoginUserQuery
// ====================================================

export interface LoginUserQuery_loginUser_location {
  __typename: "UserLocation";
  latitude: number;
  longitude: number;
}

export interface LoginUserQuery_loginUser {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
  location: LoginUserQuery_loginUser_location | null;
}

export interface LoginUserQuery {
  loginUser: LoginUserQuery_loginUser;
}
