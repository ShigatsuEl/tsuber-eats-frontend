/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: LoginUserQuery
// ====================================================

export interface LoginUserQuery_loginUser {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface LoginUserQuery {
  loginUser: LoginUserQuery_loginUser;
}
