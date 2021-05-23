import { useApolloClient, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
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
  const client = useApolloClient();
  const { data: loginUserData } = useLoginUser();
  const {
    register,
    handleSubmit,
    getValues,
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
  const history = useHistory();

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
    if (ok && loginUserData) {
      //update cache
      const {
        loginUser: { id, email: prevEmail },
      } = loginUserData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
        history.push("/");
      }
    }
  }

  return (
    <div className="h-except-header flex flex-col items-center pt-36 2xl:pt-72">
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
