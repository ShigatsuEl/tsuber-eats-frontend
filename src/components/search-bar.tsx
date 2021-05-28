/* eslint-disable jsx-a11y/no-redundant-roles */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { GetAllRestaurantsQuery } from "../__generated__/GetAllRestaurantsQuery";

interface ISearchBarProps {
  className?: string;
  data?: GetAllRestaurantsQuery;
}

interface IFormProps {
  search: string;
}

export const SearchBar: React.FC<ISearchBarProps> = ({ className, data }) => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();

  const onValid = () => {
    const { search } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${search}`,
    });
  };

  return (
    <div
      data-testid="search-bar"
      className={
        (className && className) || "relative w-full mt-5 sm:w-1/2 sm:mt-0"
      }
    >
      <FontAwesomeIcon icon={faSearch} className="absolute top-5 left-6 z-10" />
      <form role="form" onSubmit={handleSubmit(onValid)} className="w-full">
        <input
          {...register("search", { required: true })}
          name="search"
          className="w-full border-b-2 py-4 px-14 font-semibold placeholder-gray-800 bg-gray-200 opacity-60 transition-colors focus:outline-none focus:border-black"
          type="search"
          placeholder="What are you craving?"
        />
      </form>
    </div>
  );
};
