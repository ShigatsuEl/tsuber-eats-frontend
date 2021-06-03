import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
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

interface IForm {
  name: string;
  price: string;
  description: string;
  option: { name: string; extra: string }[];
}

export const CreateDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const { register, getValues, handleSubmit, formState, setValue } =
    useForm<IForm>({
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
  const [optionNumber, setOptionNumber] = useState(0);

  const onValid = () => {
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    /* createMutation({
      variables: {
        input: {
          restaurantId: +id,
          name,
          price: +price,
          description,
        },
      },
    });
    history.goBack(); */
  };

  const onAddDishOptionClick = () => {
    setOptionNumber((current) => current + 1);
  };

  const onRemoveOptionClick = (id: number) => {
    setOptionNumber((current) => current - 1);
    // @ts-ignore
    setValue(`option.${id}`, { name: "", extra: "" });
  };

  return (
    <div className="flex flex-col items-center px-10">
      <HelmetProvider>
        <title>Create Dish | Tsuber Eats</title>
      </HelmetProvider>
      <h1 className="mb-5 font-semibold text-3xl">Create Restaurant</h1>
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
        <hr className="mt-1 mb-5 w-full max-w-screen-sm" />
        <div>
          <span
            onClick={onAddDishOptionClick}
            className="inline-block mb-5 p-2 bg-lime-600 text-white"
          >
            Add Dish Option
          </span>
        </div>
        {optionNumber !== 0 &&
          Array.from(new Array(optionNumber)).map((_, index) => (
            <div key={index} className="mb-5">
              <input
                // @ts-ignore
                {...register(`option.${index}.name`)}
                className="input mr-5"
                name={`option.${index}.name`}
                type="text"
                placeholder="Option Name"
              />
              <input
                // @ts-ignore
                {...register(`option.${index}.extra`)}
                className="input"
                name={`option.${index}.extra`}
                type="number"
                min={0}
                placeholder="Option Extra"
              />
              <span onClick={() => onRemoveOptionClick(index)}>
                Remove Button
              </span>
            </div>
          ))}
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
