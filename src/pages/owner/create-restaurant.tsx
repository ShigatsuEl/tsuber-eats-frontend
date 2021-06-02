import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "../../__generated__/CreateRestaurantMutation";

const CREATE_RESTAURANT_MUATION = gql`
  mutation CreateRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFromProps {
  name: string;
  address: string;
  coverImg: string;
  categoryName: string;
}

export const CreateRestaurant = () => {
  const [createRestaurant, { loading, data }] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUATION);
  const { register, getValues, handleSubmit, formState } = useForm<IFromProps>({
    mode: "onChange",
  });

  const onValid = () => {};

  return (
    <div className="mx-10">
      <HelmetProvider>
        <title>Create Restaurant | Tsuber Eats</title>
      </HelmetProvider>
      <h1 className="mb-5 font-semibold text-3xl">Create Restaurant</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("name", { required: "Name is required" })}
          className="input mb-3"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          {...register("address", { required: "Address is required" })}
          className="input mb-3"
          type="text"
          name="address"
          placeholder="Address"
        />
        <input
          {...register("categoryName", {
            required: "CategoryName is required",
          })}
          className="input mb-3"
          type="text"
          name="categoryName"
          placeholder="Category Name"
        />
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
