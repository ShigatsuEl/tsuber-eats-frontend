import React from "react";

export const LogIn = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-lg rounded-lg py-10 text-center bg-white">
        <h3 className="font-bold text-2xl text-gray-800">Tsuber Eats</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            placeholder="Email"
            className="border-2 rounded-lg py-3 px-5 shadow-inner bg-gray-100 focus:outline-none focus:border-gray-400 focus:border-opacity-50"
          />
          <input
            placeholder="Password"
            className="mt-3 border-2 rounded-lg py-3 px-5 shadow-inner bg-gray-100 focus:outline-none focus:border-gray-400 focus:border-opacity-50"
          />
          <button className="mt-3 py-3 rounded-lg px-5 font-medium text-white bg-gray-800 focus:outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
