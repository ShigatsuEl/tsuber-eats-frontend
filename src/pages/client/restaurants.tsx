import { url } from "inspector";
import React from "react";
import { Category } from "../../components/category";
import { useRestaurants } from "../../hooks/useRestaurants";

export const Restaurants = () => {
  const { data, loading } = useRestaurants();
  console.log(data);
  return (
    <div>
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
            <Category data={data} />
          </div>
          <div className="grid grid-cols-3 gap-6 mx-10">
            {data?.getAllRestaurants.results?.map((restaurant) => (
              <div>
                <div
                  className="mb-3 py-28 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                ></div>
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <span>{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
