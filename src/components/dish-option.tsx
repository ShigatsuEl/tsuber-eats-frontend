import React from "react";
import {
  GetRestaurantQuery_getRestaurant_restaurant_menu,
  GetRestaurantQuery_getRestaurant_restaurant_menu_options,
} from "../__generated__/GetRestaurantQuery";

interface IDishOptionProps {
  isCustomer?: boolean;
  index: number;
  option: GetRestaurantQuery_getRestaurant_restaurant_menu_options;
  dish: GetRestaurantQuery_getRestaurant_restaurant_menu;
  isSelected?: boolean;
  isOrderStart?: boolean;
  addOptionToItem?: (dishId: number, optionName: string) => void;
  removeOptionFromItem?: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isCustomer = false,
  index,
  option,
  dish,
  isOrderStart,
  isSelected,
  addOptionToItem,
  removeOptionFromItem,
  children,
}) => {
  const onItemOptionClick = (
    event: React.MouseEvent<HTMLElement>,
    dish: GetRestaurantQuery_getRestaurant_restaurant_menu,
    option: any
  ) => {
    if (addOptionToItem && removeOptionFromItem) {
      if (isOrderStart) {
        if (isSelected) {
          removeOptionFromItem(dish.id, option.name);
        } else {
          addOptionToItem(dish.id, option.name);
        }
      }
    }
  };

  return (
    <React.Fragment>
      {isCustomer ? (
        <div
          className={`flex flex-col justify-center text-lg font-semibold opacity-70 ${
            isSelected && "opacity-100"
          } ${dish.options?.length! - 1 === index ? "mb-0" : "mb-3"}`}
        >
          <div
            className={`flex items-center ${isSelected && "bg-lime-500"}`}
            onClick={(event) => onItemOptionClick(event, dish, option)}
          >
            <h6 className="mr-2">{option.name}</h6>
            {option.extra && <h6 className="">{option.extra}￦</h6>}
          </div>
          {children}
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center text-lg font-semibold ${
            dish.options?.length! - 1 === index ? "mb-0" : "mb-3"
          }`}
        >
          <div className={`flex items-center ${isSelected && "bg-lime-500"}`}>
            <h6 className="mr-2">{option.name}</h6>
            {option.extra && <h6 className="">{option.extra}￦</h6>}
          </div>
          {children}
        </div>
      )}
    </React.Fragment>
  );
};
