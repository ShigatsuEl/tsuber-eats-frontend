import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";

// 8번째 라인은 오직 프론트엔드를 위한 것이다. 백엔드로 전송되지 않는다.
const LOGIN_MUTATION = gql`
  mutation LoginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const LogIn = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [loginMutaion, { data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  function onCompleted(data: LoginMutation) {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  }

  const onValid = () => {
    const { email, password } = getValues();
    loginMutaion({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-lg rounded-lg py-10 text-center bg-white">
        <h3 className="font-bold text-2xl text-gray-800">Tsuber Eats</h3>
        <form onSubmit={handleSubmit(onValid)} className="grid gap-3 mt-5 px-5">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            required
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 10,
            })}
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 characters" />
          )}
          <button className="btn mt-3">Log In</button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
