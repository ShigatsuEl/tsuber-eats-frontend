/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface EditUserProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetCategoryInput {
  page?: number | null;
  slug: string;
}

export interface GetRestaurantInput {
  restaurantId: number;
}

export interface GetRestaurantsInput {
  page?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
