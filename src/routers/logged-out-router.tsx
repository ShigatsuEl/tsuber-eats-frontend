import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = () => console.log(watch("email"));
  const onInValid = () => console.log("Can't create account");
  console.log(errors);
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
