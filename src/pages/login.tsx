import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const LogIn = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onValid = () => console.log(getValues());

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
            <span className="font-medium text-red-500">
              {errors.email.message}
            </span>
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
            <span className="font-medium text-red-500">
              {errors.password.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Password must be more than 10 characters
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
