import React from "react";
import { GetRestaurantQuery_getRestaurant_restaurant_menu_options } from "../__generated__/GetRestaurantQuery";

interface IDishProps {
  id?: number;
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  isOrderStart?: boolean;
  options?: GetRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
  addItemToOrder: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  price,
  description,
  isCustomer = false,
  isOrderStart = false,
  options,
  addItemToOrder,
}) => {
  return (
    <div
      onClick={() => (isOrderStart ? addItemToOrder(id) : null)}
      className="group flex flex-col border-2 border-gray-400 pt-4 px-5 pb-6 bg-lime-400 transition hover:border-gray-800"
    >
      <h2 className="mb-2 text-3xl">{name}</h2>
      <span className="mb-10 opacity-70">{description}</span>
      <span className="inline-block mb-5">{price}￦</span>
      {isCustomer && options !== null && (
        <div className="p-2 bg-lime-300 transition group-hover:shadow-xl">
          <h5 className="mb-1 font-semibold">DISH OPTIONS</h5>
          {options?.map((option, index) => (
            <span key={index} className="flex items-center mb-1 text-sm">
              <h6 className="mr-2 opacity-70">{option.name}</h6>
              <h6 className="opacity-70">{option.extra}￦</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
