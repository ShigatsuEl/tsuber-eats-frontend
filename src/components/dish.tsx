import React from "react";
import { GetRestaurantQuery_getRestaurant_restaurant_menu_options } from "../__generated__/GetRestaurantQuery";

interface IDishProps {
  id?: number;
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  isOrderStart?: boolean;
  isSelected?: boolean;
  options?: GetRestaurantQuery_getRestaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeItemFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  price,
  description,
  isCustomer = false,
  isOrderStart = false,
  isSelected = false,
  options,
  addItemToOrder,
  removeItemFromOrder,
  children: dishOptions,
}) => {
  const onItemClick = (event: React.MouseEvent<HTMLElement>) => {
    const { target }: { target: any } = event;
    if (isOrderStart && target.closest("div").dataset.id === "dish") {
      // 이벤트 위임을 사용해 특정 div를 클릭시 주문 아이템 옵션을 변경할 수 있도록 설정
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeItemFromOrder) {
        return removeItemFromOrder(id);
      }
    }
  };

  return (
    <div
      data-id="dish"
      onClick={onItemClick}
      className={`group flex flex-col border-2 border-gray-400 pt-4 px-5 pb-6 transition ${
        isSelected ? "bg-lime-600" : "bg-lime-400 hover:border-gray-800"
      } ${isOrderStart && "cursor-pointer"}`}
    >
      <h2 className="mb-2 text-3xl">{name}</h2>
      <span className="mb-10 opacity-70">{description}</span>
      <span className="inline-block mb-5">{price}￦</span>
      {isCustomer && options !== null && (
        <div
          data-id="option"
          className={`p-2 bg-lime-300 transition group-hover:shadow-xl ${
            isOrderStart && isSelected ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <h5 className="mb-3 font-semibold text-lg">DISH OPTIONS</h5>
          {dishOptions}
        </div>
      )}
    </div>
  );
};