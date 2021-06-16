/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  EditDishMutation,
  EditDishMutationVariables,
} from "../../__generated__/EditDishMutation";
import {
  GetOwnerRestaurantQuery,
  GetOwnerRestaurantQueryVariables,
} from "../../__generated__/GetOwnerRestaurantQuery";
import { GET_OWNER_RESTAURANT_QUERY } from "./owner-restaurant";

const EDIT_DISH_MUTATION = gql`
  mutation EditDishMutation($input: EditDishInput!) {
    editDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
  dishId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

interface IChoices {
  __typename: "DishChoice";
  id: string;
  name: string;
  extra: number | null;
}

interface IOptions {
  __typename: "DishOption";
  id: string;
  name: string;
  extra: number | null;
  choices: IChoices[] | null;
}

interface IDish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: IOptions[] | null;
}

export const EditDish = () => {
  const [options, setOptions] = useState<
    { id: number; subOptions: number[] }[]
  >([]);
  const [dish, setDish] = useState<IDish>();
  const { id, dishId } = useParams<IParams>();
  const history = useHistory();
  const { register, getValues, handleSubmit, formState, setValue } =
    useForm<IForm>({
      mode: "onChange",
    });
  const { data: restaurantData } = useQuery<
    GetOwnerRestaurantQuery,
    GetOwnerRestaurantQueryVariables
  >(GET_OWNER_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
  const [editDish, { data, loading }] = useMutation<
    EditDishMutation,
    EditDishMutationVariables
  >(EDIT_DISH_MUTATION, {
    refetchQueries: [
      {
        query: GET_OWNER_RESTAURANT_QUERY,
        variables: { input: { id: +id } },
      },
    ],
  });

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
    const dishOptionObject = dish!.options?.map((dishOption) => ({
      name: rest[`${dishOption.id}-option-name`],
      extra: +rest[`${dishOption.id}-option-extra`],
      choices: dishOption!.choices?.map((choice) => ({
        name: rest[`${choice.id}-option-choice-name`],
        extra: +rest[`${choice.id}-option-choice-extra`],
      })),
    }));
    editDish({
      variables: {
        input: {
          dishId: +dishId,
          name,
          price: +price,
          description,
          options: [...optionObject, ...dishOptionObject!],
        },
      },
    });
    history.goBack();
  };

  const onAddDishOptionClick = () => {
    setOptions((current) => [{ id: Date.now(), subOptions: [] }, ...current]);
  };

  const onAddSubOptionClick = (id: number | string) => {
    if (typeof id === "number" && id.toString().length === 13) {
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
    } else {
      setDish((current) => ({
        ...current!,
        options: current!.options!.map((option) => {
          if (option.id === id) {
            return {
              ...option,
              choices: [
                { __typename: "DishChoice", name: "", extra: 0, id: uuidv4() },
                ...option.choices!,
              ],
            };
          }
          return option;
        }),
      }));
    }
  };

  const onRemoveOptionClick = (
    idxToDelete: number | string,
    optionName?: string
  ) => {
    if (
      typeof idxToDelete === "number" &&
      idxToDelete.toString().length === 13
    ) {
      setOptions((current) =>
        // 삭제하는 옵션 중 서브 옵션이 있다면 서브옵션까지 전부 값 초기화
        current
          .map((option) => {
            if (option.id === idxToDelete) {
              option.subOptions.map((subOption) => {
                setValue(`${subOption}-option-choice-name`, "");
                setValue(`${subOption}-option-choice-name`, "");
                return subOption;
              });
            }
            return option;
          })
          .filter((option) => option.id !== idxToDelete)
      );
    } else {
      setDish((current) => ({
        ...current!,
        options: current!
          .options!.map((option) => {
            option.choices?.forEach((choice) => {
              setValue(`${choice.id}-option-choice-name`, "");
              setValue(`${choice.id}-option-choice-extra`, "");
            });
            return option;
          })
          .filter((option) => option.name !== optionName),
      }));
    }
    setValue(`${idxToDelete}-option-name`, "");
    setValue(`${idxToDelete}-option-extra`, "");
  };

  const onRemoveSubOptionClick = (
    idxToDelete: number | string,
    subIdxToDelete?: number | string,
    choiceName?: string
  ) => {
    if (idxToDelete.toString().length === 13) {
      // 새로 추가한 서브 옵션들을 삭제할 때
      setOptions((current) =>
        // 서브 옵션 삭제
        current.map((option) => ({
          id: option.id,
          subOptions: option.subOptions.filter(
            (subOption) => subOption !== idxToDelete
          ),
        }))
      );
      setValue(`${idxToDelete}-option-choice-name`, "");
      setValue(`${idxToDelete}-option-choice-extra`, "");
    } else {
      // 기존 메뉴의 서브 옵션들을 삭제할 때
      setDish((current) => ({
        ...current!,
        options: current!.options!.map((option) => ({
          ...option!,
          choices: option.choices!.filter(
            (choice) => choice.id !== subIdxToDelete
          ),
        })),
      }));
      setValue(`${subIdxToDelete}-option-choice-name`, "");
      setValue(`${subIdxToDelete}-option-choice-extra`, "");
    }
  };

  useEffect(() => {
    if (restaurantData) {
      let result: IDish;
      const findData = restaurantData.getOwnerRestaurant.restaurant?.menu.find(
        (dish) => dish.id === +dishId
      );
      result = {
        ...findData!,
        options:
          findData?.options! &&
          findData!.options!.map((option) => ({
            ...option,
            id: uuidv4(),
            choices:
              option.choices! &&
              option.choices!.map((choice) => ({
                ...choice,
                id: uuidv4(),
              })),
          })),
      };
      setDish(result);
    }
  }, [restaurantData]);

  useEffect(() => {
    if (dish) {
      setValue("name", dish.name);
      setValue("price", dish.price.toString());
      setValue("description", dish.description);
      dish.options?.forEach((option) => {
        setValue(`${option.id}-option-name`, option.name);
        setValue(`${option.id}-option-extra`, option.extra!.toString());
        option.choices?.forEach((choice) => {
          setValue(`${choice.id}-option-choice-name`, choice.name);
          setValue(
            `${choice.id}-option-choice-extra`,
            choice.extra!.toString()
          );
        });
      });
    }
  }, [dish]);

  return (
    <div className="flex flex-col items-center px-10">
      <Helmet>
        <title>Edit Dish | Tsuber Eats</title>
      </Helmet>
      <h1 className="mb-5 font-semibold text-3xl">Edit Dish</h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className="grid gap-3 mt-5 mb-3 w-full max-w-screen-sm"
      >
        <input
          {...register("name")}
          className="input mb-3"
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        {formState.errors?.name?.message && (
          <FormError errorMessage={formState.errors.name.message} />
        )}
        <input
          {...register("price", {
            min: 0,
          })}
          className="input mb-3"
          type="number"
          min={0}
          name="price"
          placeholder="Price"
          required
        />
        {formState.errors?.price?.message && (
          <FormError errorMessage={formState.errors.price.message} />
        )}
        <input
          {...register("description")}
          className="input mb-3"
          type="text"
          name="description"
          placeholder="Description"
          required
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
        {dish &&
          dish.options?.length !== 0 &&
          dish.options?.map((dishOption) => (
            <div key={dishOption.id} className="mb-5">
              <div className="flex justify-between mb-2 w-full">
                <input
                  {...register(`${dishOption.id}-option-name`)}
                  className="input w-space-1/2"
                  name={`${dishOption.id}-option-name`}
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${dishOption.id}-option-extra`, { min: 0 })}
                  className="input w-space-1/2"
                  name={`${dishOption.id}-option-extra`}
                  type="number"
                  min={0}
                  defaultValue={0}
                  placeholder="Option Extra"
                />
              </div>
              <div className="flex justify-end mb-2">
                <span
                  onClick={() => {
                    onAddSubOptionClick(dishOption.id);
                  }}
                  className="btn"
                >
                  Add Sub Option
                </span>
                <span
                  onClick={() =>
                    onRemoveOptionClick(dishOption.id, dishOption.name)
                  }
                  className="btn ml-5"
                >
                  Remove Option
                </span>
              </div>
              {dishOption &&
                dishOption.choices?.length !== 0 &&
                dishOption.choices?.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex flex-col items-end mb-2 w-full"
                  >
                    <div className="flex justify-between mb-2 sm:flex-none">
                      <input
                        {...register(`${choice.id}-option-choice-name`)}
                        className="input w-space-1/2 sm:w-auto sm:mr-3"
                        name={`${choice.id}-option-choice-name`}
                        type="text"
                        placeholder="Sub Option Name"
                      />
                      <input
                        {...register(`${choice.id}-option-choice-extra`, {
                          min: 0,
                        })}
                        className="input w-space-1/2 sm:w-auto"
                        name={`${choice.id}-option-choice-extra`}
                        type="number"
                        min={0}
                        defaultValue={0}
                        placeholder="Sub Option Extra"
                      />
                    </div>
                    <span
                      onClick={() =>
                        onRemoveSubOptionClick(
                          dishOption.id,
                          choice.id,
                          choice.name
                        )
                      }
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
          actionText="Edit Dish"
        />
        {data?.editDish?.error && (
          <FormError errorMessage={data.editDish.error} />
        )}
      </form>
    </div>
  );
};
