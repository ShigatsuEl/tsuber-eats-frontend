import React from "react";
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
        <div className="flex flex-wrap justify-center my-5 mx-10">
          {data?.getAllCategories.categories?.map((catetory, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-16 h-16 mx-4 mb-1 rounded-full bg-cover bg-center bg-opacity-60 hover:bg-gray-200"
                style={{ backgroundImage: `url(${catetory.coverImg})` }}
              ></div>
              <span className="inline-block w-20 mb-4 break-words capitalize text-center">
                {catetory.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
