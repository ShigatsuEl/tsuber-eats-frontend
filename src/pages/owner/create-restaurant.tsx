import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
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

interface IFormProps {
  name: string;
  address: string;
  coverImg: FileList;
  categoryName: string;
}

export const CreateRestaurant = () => {
  const [createRestaurant, { data }] = useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUATION, {
    onCompleted,
  });
  const { register, getValues, handleSubmit, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);

  const onValid = async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, coverImg } = getValues();
      const file = coverImg[0];
      const formBody = new FormData();
      formBody.append("file", file);
      const { url } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      createRestaurant({
        variables: {
          input: {
            name,
            address,
            categoryName,
            coverImg: url,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  function onCompleted(data: CreateRestaurantMutation) {
    const {
      createRestaurant: { ok },
    } = data;
    if (ok) setUploading(false);
  }

  return (
    <div className="flex flex-col items-center px-10">
      <HelmetProvider>
        <title>Create Restaurant | Tsuber Eats</title>
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
        <input
          {...register("coverImg", { required: true })}
          className="input mb-3"
          type="file"
          name="coverImg"
          accept="image/*"
        />
        <Button
          canClick={formState.isValid}
          loading={uploading}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
