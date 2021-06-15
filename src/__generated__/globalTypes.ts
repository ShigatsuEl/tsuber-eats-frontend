/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delevered = "Delevered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

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

export interface CreateDishInput {
  name: string;
  price: number;
  description: string;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg: string;
  address: string;
  categoryName: string;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditDishInput {
  name?: string | null;
  price?: number | null;
  photo?: string | null;
  description?: string | null;
  options?: DishOptionInputType[] | null;
  dishId: number;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditUserProfileInput {
  email?: string | null;
  password?: string | null;
  location?: UserLocationInputType | null;
}

export interface GetCategoryInput {
  page?: number | null;
  slug: string;
}

export interface GetOrderInput {
  id: number;
}

export interface GetOwnerRestaurantInput {
  id: number;
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

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface TakeOrderInput {
  id: number;
}

export interface UpdateOrderInput {
  id: number;
}

export interface UserLocationInputType {
  latitude: number;
  longitude: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
