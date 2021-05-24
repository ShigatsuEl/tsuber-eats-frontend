import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet-async";
import { CategoryContainer } from "../../components/category-container";
import { RestaurantList } from "../../components/restaurant-list";
import { useRestaurants } from "../../hooks/useRestaurants";

export const Restaurants = () => {
  const { data, loading, page, setPage } = useRestaurants();

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Restaurants | Tsuber Eats</title>
      </Helmet>
      <div className="flex flex-col w-full px-10 bg-gray-800">
        <div>
          <h2 className="mb-5 pt-32 font-medium text-4xl text-white">
            Crave it? Get it.
          </h2>
          <h4 className="mb-32 font-normal text-base text-white">
            Search for a favorite restaurant, cuisine, or dish.
          </h4>
        </div>
      </div>
      {!loading && (
        <>
          <div className="flex flex-wrap justify-center my-5 mx-10 border-b">
            <CategoryContainer data={data} />
          </div>
          <div className="grid grid-cols-1 gap-6 mx-10 mb-5 sm:grid-cols-2 lg:grid-cols-3">
            <RestaurantList data={data} />
          </div>
          <div className="flex justify-center items-center mb-5">
            {page > 1 && (
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="font-medium text-2xl cursor-pointer focus:outline-none"
                onClick={onPrevPageClick}
              />
            )}
            <span className="mx-5 font-medium text-lg">
              Page {page} of {data?.getAllRestaurants.totalPages}
            </span>
            {page !== data?.getAllRestaurants.totalPages && (
              <FontAwesomeIcon
                icon={faArrowRight}
                className="font-medium text-2xl cursor-pointer focus:outline-none"
                onClick={onNextPageClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
