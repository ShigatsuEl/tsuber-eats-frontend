import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  CreateDishMutation,
  CreateDishMutationVariables,
} from "../../__generated__/CreateDishMutation";
import { GET_OWNER_RESTAURANT_QUERY } from "./owner-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation CreateDishMutation($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

interface IFormPros {
  name: string;
  price: string;
  description: string;
}

export const CreateDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { register, getValues, handleSubmit, formState } = useForm<IFormPros>({
    mode: "onChange",
  });
  const [createMutation, { data, loading }] = useMutation<
    CreateDishMutation,
    CreateDishMutationVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: GET_OWNER_RESTAURANT_QUERY,
        variables: { input: { id: +id } },
      },
    ],
  });

  const onValid = () => {
    const { name, price, description } = getValues();
    console.log(name, price, description);
    createMutation({
      variables: {
        input: {
          restaurantId: +id,
          name,
          price: +price,
          description,
        },
      },
    });
    history.goBack();
  };

  return (
    <div className="flex flex-col items-center px-10">
      <HelmetProvider>
        <title>Create Dish | Tsuber Eats</title>
      </HelmetProvider>
      <h1 className="mt-10 mb-5 font-semibold text-3xl">Create Restaurant</h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className="grid gap-3 mt-5 mb-3 w-full max-w-screen-sm"
      >
        <input
          {...register("name", { required: "Name is required" })}
          className="input mb-3"
          type="text"
          name="name"
          placeholder="Name"
        />
        {formState.errors?.name?.message && (
          <FormError errorMessage={formState.errors.name.message} />
        )}
        <input
          {...register("price", {
            required: "Price is required",
            min: 0,
          })}
          className="input mb-3"
          type="number"
          min={0}
          name="price"
          placeholder="Price"
        />
        {formState.errors?.price?.message && (
          <FormError errorMessage={formState.errors.price.message} />
        )}
        <input
          {...register("description", {
            required: "Description is required",
          })}
          className="input mb-3"
          type="text"
          name="description"
          placeholder="Description"
        />
        {formState.errors?.description?.message && (
          <FormError errorMessage={formState.errors.description.message} />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Create Dish"
        />
        {data?.createDish?.error && (
          <FormError errorMessage={data.createDish.error} />
        )}
      </form>
    </div>
  );
};
