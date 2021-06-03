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
  [key: string]: string;
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
  const [optionNumber, setOptionNumber] = useState<number[]>([]);

  const onValid = () => {
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    const optionObject = optionNumber.map((id) => ({
      name: rest[`${id}-option-name`],
      extra: +rest[`${id}-option-extra`],
    }));
    console.log(optionObject);
    createMutation({
      variables: {
        input: {
          restaurantId: +id,
          name,
          price: +price,
          description,
          options: optionObject,
        },
      },
    });
    history.goBack();
  };

  const onAddDishOptionClick = () => {
    setOptionNumber((current) => [Date.now(), ...current]);
  };

  const onRemoveOptionClick = (idToDelete: number) => {
    setOptionNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-option-name`, "");
    setValue(`${idToDelete}-option-extra`, "");
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
          <span onClick={onAddDishOptionClick} className="btn mb-5">
            Add Dish Option
          </span>
        </div>
        {optionNumber.length !== 0 &&
          optionNumber.map((id) => (
            <div key={id} className="mb-5">
              <input
                {...register(`${id}-option-name`)}
                className="input mr-5"
                name={`${id}-option-name`}
                type="text"
                placeholder="Option Name"
              />
              <input
                {...register(`${id}-option-extra`)}
                className="input mr-5"
                name={`${id}-option-extra`}
                type="number"
                min={0}
                defaultValue={0}
                placeholder="Option Extra"
              />
              <span onClick={() => onRemoveOptionClick(id)} className="btn">
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
