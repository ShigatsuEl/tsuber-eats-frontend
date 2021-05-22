import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useLoginUser } from "../../hooks/useLoginUser";
import {
  EditUserProfileMutation,
  EditUserProfileMutationVariables,
} from "../../__generated__/EditUserProfileMutation";

const EDIT_USER_PROFILE_MUTATION = gql`
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
}

export const EditProfile = () => {
  const { data } = useLoginUser();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: data?.loginUser.email,
    },
  });
  const [editUserProfile, { loading }] = useMutation<
    EditUserProfileMutation,
    EditUserProfileMutationVariables
  >(EDIT_USER_PROFILE_MUTATION, {
    onCompleted,
  });

  const onValid = () => {
    const { email, password } = getValues();
    editUserProfile({
      variables: {
        editUserProfileInput: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  function onCompleted(data: EditUserProfileMutation) {
    const {
      editUserProfile: { ok },
    } = data;
    if (ok) {
      //update cache
    }
  }

  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onValid)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
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
        {errors.password?.message && (
          <FormError errorMessage={errors.password.message} />
        )}
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
