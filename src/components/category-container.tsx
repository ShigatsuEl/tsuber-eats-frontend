import React from "react";
import { Link } from "react-router-dom";
import { GetAllRestaurantsQuery } from "../__generated__/GetAllRestaurantsQuery";

interface ICategoryProps {
  id: string;
  slug: string;
  coverImg: string;
  name: string;
}

export const CategoryContainer: React.FC<ICategoryProps> = ({
  slug,
  coverImg,
  name,
}) => {
  return (
    <Link to={`/category/${slug}`}>
      <div className="flex flex-col items-center mb-5">
        <div
          className="w-16 h-16 mx-4 mb-1 rounded-full bg-cover bg-center bg-opacity-60 hover:bg-gray-200"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <span className="inline-block w-20 break-words capitalize text-center">
          {name}
        </span>
      </div>
    </Link>
  );
};
