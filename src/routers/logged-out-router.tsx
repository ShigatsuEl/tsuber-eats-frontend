import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = () => console.log(watch("email"));
  const onInValid = () => console.log("Can't create account");
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onValid, onInValid)}>
        <div>
          <input
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            type="email"
            name="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
