import React from "react";
import { Helmet } from "react-helmet-async";
import { CategoryContainer } from "../../components/category-container";
import { Pagination } from "../../components/pagination";
import { RestaurantContainer } from "../../components/restaurant-container";
import { useRestaurants } from "../../hooks/useRestaurants";

export const Restaurants = () => {
  const { data, loading, page, setPage } = useRestaurants();

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
            {data?.getAllCategories.categories?.map((catetory) => (
              <CategoryContainer
                key={catetory.id + ""}
                id={catetory.id + ""}
                slug={catetory.slug}
                coverImg={catetory.coverImg!}
                name={catetory.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 mx-10 mb-5 sm:grid-cols-2 lg:grid-cols-3">
            {data?.getAllRestaurants.results?.map((restaurant) => (
              <RestaurantContainer
                key={restaurant.id + ""}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name!}
                address={restaurant.address}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mb-5">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.getAllRestaurants.totalPages!}
            />
          </div>
        </>
      )}
    </div>
  );
};
