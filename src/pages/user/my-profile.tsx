import React from "react";
import { Helmet } from "react-helmet-async";
import { useLoginUser } from "../../hooks/useLoginUser";

export const MyProfile = () => {
  const { data } = useLoginUser();
  return (
    <div className="h-except-header flex flex-col items-center">
      <Helmet>
        <title>My Profile | Tsuber Eats</title>
      </Helmet>
      <div className="flex flex-col items-center w-full max-w-screen-sm pt-40 px-10 lg:px-0">
        <div className="mb-5 font-semibold text-2xl">My Profile</div>
        <div className="flex">
          <div className="flex flex-col">
            <div className="font-medium text-xl mr-5 mb-3 p-2">Email</div>
            <div className="font-medium text-xl mr-5 mb-3 p-2">Verified</div>
            <div className="font-medium text-xl mr-5 mb-3 p-2">Role</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-3 p-2 font-medium text-xl bg-gray-200 bg-opacity-60">
              {data?.loginUser.email}
            </div>
            <div className="mb-3 p-2 font-medium text-xl bg-gray-200 bg-opacity-60">
              {data?.loginUser.verified ? "O" : "X"}
            </div>
            <div className="mb-3 p-2 font-medium text-xl bg-gray-200 bg-opacity-60">
              {data?.loginUser.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
