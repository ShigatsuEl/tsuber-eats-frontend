import React from "react";
import { GetAllRestaurantsQuery } from "../__generated__/GetAllRestaurantsQuery";

interface ICategoryProps {
  data?: GetAllRestaurantsQuery;
}

export const Category: React.FC<ICategoryProps> = ({ data }) => {
  return (
    <>
      {data?.getAllCategories.categories?.map((catetory, index) => (
        <div key={index} className="flex flex-col items-center mb-5">
          <div
            className="w-16 h-16 mx-4 mb-1 rounded-full bg-cover bg-center bg-opacity-60 hover:bg-gray-200"
            style={{ backgroundImage: `url(${catetory.coverImg})` }}
          ></div>
          <span className="inline-block w-20 break-words capitalize text-center">
            {catetory.name}
          </span>
        </div>
      ))}
    </>
  );
};
