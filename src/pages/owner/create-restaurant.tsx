import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables,
} from "../../__generated__/CreateRestaurantMutation";
import { GET_MY_RESTAURANTS_QUERY } from "./my-restaurants";

const CREATE_RESTAURANT_MUATION = gql`
  mutation CreateRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
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
  const client = useApolloClient();
  const history = useHistory();
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
  const [imgUrl, setImgUrl] = useState("");

  const onValid = async () => {
    try {
      setUploading(true);
      const { name, address, categoryName, coverImg } = getValues();
      const file = coverImg[0];
      const formBody = new FormData();
      formBody.append("file", file);
      let { url } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      url = url.replace(/ /g, "+");

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
      setImgUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  function onCompleted(data: CreateRestaurantMutation) {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);
      const { name, address, categoryName } = getValues();
      // API를 한번 더 요청하지 않고 CACHE에 있는 data를 업데이트하여 앱을 최적화 한다
      // 주의할 점은 반드시 My Restaurants Page에 접속해야 Cache에 getMyRestaurants가 저장된다는 것
      const queryResult = client.readQuery({ query: GET_MY_RESTAURANTS_QUERY });
      client.writeQuery({
        query: GET_MY_RESTAURANTS_QUERY,
        data: {
          getMyRestaurants: {
            ...queryResult.getMyRestaurants,
            restaurants: [
              {
                address,
                category: { name: categoryName, __typename: "Category" },
                coverImg: imgUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.getMyRestaurants.restaurants,
            ],
          },
        },
      });
      history.push("/");
    }
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
