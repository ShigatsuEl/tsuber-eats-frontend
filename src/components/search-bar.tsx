import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { GetAllRestaurantsQuery } from "../__generated__/GetAllRestaurantsQuery";

interface ISearchBarProps {
  className?: string;
  data?: GetAllRestaurantsQuery;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ className, data }) => {
  return (
    <div className={(className && className) || "relative w-1/2"}>
      <FontAwesomeIcon icon={faSearch} className="absolute top-5 left-6 z-10" />
      <form className="w-full">
        <input
          className="w-full border-b-2 py-4 px-14 font-semibold placeholder-gray-800 bg-gray-200 opacity-60 transition-colors focus:outline-none focus:border-black"
          type="search"
          placeholder="What are you craving?"
        />
      </form>
    </div>
  );
};
