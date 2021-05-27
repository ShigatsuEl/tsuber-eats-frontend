import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/LoginMutation";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { Logo, LogoLocation } from "../components/logo";

// 8번째 라인은 오직 프론트엔드를 위한 것이다. 백엔드로 전송되지 않는다.
export const LOGIN_MUTATION = gql`
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
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const [loginMutaion, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  function onCompleted(data: LoginMutation) {
    const {
      login: { ok, token },
    } = data;
    console.log(data);
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  }

  const onValid = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutaion({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-8 lg:mt-24">
      <Helmet>
        <title>Login | Tsuber Eats</title>
      </Helmet>
      <div className="flex flex-col items-center px-5 w-full max-w-screen-sm">
        <Logo where={LogoLocation.Login} />
        <h4 className="self-start mb-10 font-medium text-3xl">Welcome back</h4>
        <form
          onSubmit={handleSubmit(onValid)}
          className="grid gap-3 mt-5 mb-3 w-full"
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
            })}
            type="password"
            name="password"
            placeholder="Password"
            className="input mb-3"
            required
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <Button canClick={isValid} loading={loading} actionText="Log In" />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Tuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
