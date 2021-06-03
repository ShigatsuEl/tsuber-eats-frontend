import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useParams } from "react-router";
import {
  CreateDishMutation,
  CreateDishMutationVariables,
} from "../../__generated__/CreateDishMutation";

const CREATE_DISH_MUTATION = gql`
  mutation CreateDishMutation($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

export const CreateDish = () => {
  const { restaurantId } = useParams<IParams>();
  const [createMutation, { loading }] =
    useMutation<CreateDishMutation, CreateDishMutationVariables>(
      CREATE_DISH_MUTATION
    );
  return <h1>Create Dish!</h1>;
};
