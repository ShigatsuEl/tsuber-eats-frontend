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
  const [options, setOptions] = useState<
    { id: number; subOptions: number[] }[]
  >([]);

  const onValid = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObject = options.map((option) => ({
      name: rest[`${option.id}-option-name`],
      extra: +rest[`${option.id}-option-extra`],
      choices: option.subOptions.map((subOption) => ({
        name: rest[`${subOption}-option-choice-name`],
        extra: +rest[`${subOption}-option-choice-extra`],
      })),
    }));
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
    setOptions((current) => [{ id: Date.now(), subOptions: [] }, ...current]);
  };

  const onAddSubOptionClick = (id: number) => {
    setOptions((current) =>
      current.map((option) => {
        if (option.id === id) {
          return {
            id: option.id,
            subOptions: [Date.now(), ...option.subOptions],
          };
        }
        return option;
      })
    );
  };

  const onRemoveOptionClick = (idToDelete: number) => {
    setOptions((current) =>
      // 삭제하는 옵션 중 서브 옵션이 있다면 서브옵션까지 전부 값 초기화
      current
        .map((option) => {
          if (option.id === idToDelete) {
            option.subOptions.map((subOption) => {
              setValue(`${subOption}-option-choice-name`, "");
              setValue(`${subOption}-option-choice-name`, "");
              return subOption;
            });
          }
          return option;
        })
        .filter((option) => option.id !== idToDelete)
    );
    setValue(`${idToDelete}-option-name`, "");
    setValue(`${idToDelete}-option-extra`, "");
  };

  const onRemoveSubOptionClick = (idToDelete: number) => {
    setOptions((current) =>
      // 서브 옵션 삭제
      current.map((option) => ({
        id: option.id,
        subOptions: option.subOptions.filter(
          (subOption) => subOption !== idToDelete
        ),
      }))
    );
    setValue(`${idToDelete}-option-choice-name`, "");
    setValue(`${idToDelete}-option-choice-extra`, "");
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
              <div className="flex justify-end mb-2">
                <span
                  onClick={() => onAddSubOptionClick(option.id)}
                  className="btn"
                >
                  Add Sub Option
                </span>
                <span
                  onClick={() => onRemoveOptionClick(option.id)}
                  className="btn ml-5"
                >
                  Remove Option
                </span>
              </div>
              {option.subOptions.length !== 0 &&
                option.subOptions.map((subOption) => (
                  <div
                    key={subOption}
                    className="flex flex-col items-end mb-2 w-full"
                  >
                    <div className="flex justify-between mb-2 sm:flex-none">
                      <input
                        {...register(`${subOption}-option-choice-name`)}
                        className="input w-space-1/2 sm:w-auto sm:mr-3"
                        name={`${subOption}-option-choice-name`}
                        type="text"
                        placeholder="Sub Option Name"
                      />
                      <input
                        {...register(`${subOption}-option-choice-extra`, {
                          min: 0,
                        })}
                        className="input w-space-1/2 sm:w-auto"
                        name={`${subOption}-option-choice-extra`}
                        type="number"
                        min={0}
                        defaultValue={0}
                        placeholder="Sub Option Extra"
                      />
                    </div>
                    <span
                      onClick={() => onRemoveSubOptionClick(subOption)}
                      className="btn ml-5"
                    >
                      Remove Sub Option
                    </span>
                  </div>
                ))}
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
