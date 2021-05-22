import React from "react";
import { Button } from "../../components/button";
import { useLoginUser } from "../../hooks/useLoginUser";

export const EditProfile = () => {
  const { data } = useLoginUser();
  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input className="input" type="email" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick={true} actionText="Save Profile" />
      </form>
    </div>
  );
};
