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
  const [options, setOptions] = useState<{ id: number; subOption: number }[]>(
    []
  );

  const onValid = () => {
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    const optionObject = options.map((option) => ({
      name: rest[`${option.id}-option-name`],
      extra: +rest[`${option.id}-option-extra`],
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
    setOptions((current) => [{ id: Date.now(), subOption: 0 }, ...current]);
  };

  const onAddSubOptionClick = () => {};

  const onRemoveOptionClick = (idToDelete: number) => {
    setOptions((current) =>
      current.filter((option) => option.id !== idToDelete)
    );
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
        {options.length !== 0 &&
          options.map((option) => (
            <div key={option.id} className="mb-5">
              <div className="flex justify-between mb-2 w-full">
                <input
                  {...register(`${option.id}-option-name`)}
                  className="input w-space-1/2"
                  name={`${option.id}-option-name`}
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${option.id}-option-extra`, { min: 0 })}
                  className="input w-space-1/2"
                  name={`${option.id}-option-extra`}
                  type="number"
                  min={0}
                  defaultValue={0}
                  placeholder="Option Extra"
                />
              </div>
              <div className="flex justify-end">
                <span onClick={() => onAddSubOptionClick()} className="btn">
                  Add Sub Option
                </span>
                <span
                  onClick={() => onRemoveOptionClick(option.id)}
                  className="btn ml-5"
                >
                  Remove Option
                </span>
              </div>
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
