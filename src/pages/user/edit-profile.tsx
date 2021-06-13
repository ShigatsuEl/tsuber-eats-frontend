/* eslint-disable react-hooks/exhaustive-deps */
import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useLoginUser } from "../../hooks/useLoginUser";
import {
  EditUserProfileMutation,
  EditUserProfileMutationVariables,
} from "../../__generated__/EditUserProfileMutation";

export const EDIT_USER_PROFILE_MUTATION = gql`
  mutation EditUserProfileMutation(
    $editUserProfileInput: EditUserProfileInput!
  ) {
    editUserProfile(input: $editUserProfileInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
  latitude?: number;
  longitude?: number;
}

export const EditProfile = () => {
  const client = useApolloClient();
  const history = useHistory();
  const { data: loginUserData } = useLoginUser();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: loginUserData?.loginUser.email,
    },
  });
  const [editUserProfile, { loading }] = useMutation<
    EditUserProfileMutation,
    EditUserProfileMutationVariables
  >(EDIT_USER_PROFILE_MUTATION, {
    onCompleted,
  });

  const onValid = () => {
    const { email, password, latitude, longitude } = getValues();
    editUserProfile({
      variables: {
        editUserProfileInput: {
          email,
          ...(password !== "" && { password }),
          ...(latitude &&
            longitude &&
            latitude !== 0 &&
            longitude !== 0 && { location: { latitude, longitude } }),
        },
      },
    });
  };

  function onCompleted(data: EditUserProfileMutation) {
    const {
      editUserProfile: { ok },
    } = data;
    if (ok && loginUserData) {
      //update cache
      const {
        loginUser: { id, email: prevEmail },
      } = loginUserData;
      const {
        email: newEmail,
        latitude: newLat,
        longitude: newLng,
      } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
              location {
                latitude
                logitude
              }
            }
          `,
          data: {
            email: newEmail,
            verified: false,
            location: {
              latitude: newLat,
              longitude: newLng,
            },
          },
        });
        history.push("/");
      }
    }
  }

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  const onError = (positionError: GeolocationPositionError) => {
    console.log(positionError);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <div className="h-except-header flex flex-col items-center pt-36 3xl:pt-72">
      <Helmet>
        <title>Edit Profile | Tsuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onValid)}
        className="grid gap-3 max-w-screen-sm w-full my-5 px-10 lg:px-0"
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Must be entered in email format",
            },
          })}
          className="input"
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <FormError errorMessage={errors.email.message} />
        )}
        <input
          {...register("password")}
          className="input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          {...register("latitude")}
          className="input"
          name="latitude"
          type="number"
          step="any"
          placeholder="Latitude"
        />
        <input
          {...register("longitude")}
          className="input"
          name="longitude"
          type="number"
          step="any"
          placeholder="Longitude"
        />
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
