import React from "react";
import {
  GetRestaurantQuery_getRestaurant_restaurant_menu,
  GetRestaurantQuery_getRestaurant_restaurant_menu_options,
} from "../__generated__/GetRestaurantQuery";

interface IDishOptionProps {
  index: number;
  option: GetRestaurantQuery_getRestaurant_restaurant_menu_options;
  dish: GetRestaurantQuery_getRestaurant_restaurant_menu;
  isSelected: boolean;
  isOrderStart: boolean;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  index,
  option,
  dish,
  isOrderStart,
  isSelected,
  addOptionToItem,
  removeOptionFromItem,
}) => {
  const onItemOptionClick = (
    event: React.MouseEvent<HTMLElement>,
    dish: GetRestaurantQuery_getRestaurant_restaurant_menu,
    option: any
  ) => {
    if (isOrderStart) {
      if (isSelected) {
        removeOptionFromItem(dish.id, option.name);
      } else {
        addOptionToItem(dish.id, option.name);
      }
    }
  };

  return (
    <span
      className={`flex items-center text-lg font-semibold bg-lime-400 ${
        isSelected && "bg-lime-500 opacity-100"
      } ${dish.options?.length! - 1 === index ? "mb-0" : "mb-3"}`}
      onClick={(event) => onItemOptionClick(event, dish, option)}
    >
      <h6 className="mr-2 opacity-70">{option.name}</h6>
      {option.extra && <h6 className="opacity-70">{option.extra}￦</h6>}
    </span>
  );
};
