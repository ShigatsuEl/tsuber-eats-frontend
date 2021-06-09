/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GetRestaurantQuery_getRestaurant_restaurant_menu } from "../__generated__/GetRestaurantQuery";
import { CreateOrderItemInput } from "../__generated__/globalTypes";

interface IBillProps {
  menu?: GetRestaurantQuery_getRestaurant_restaurant_menu[];
  orderItems?: CreateOrderItemInput[];
}

export const Bill: React.FC<IBillProps> = ({ menu, orderItems }) => {
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    setTotal(0);
    orderItems?.map((order) => {
      setTotal(
        (current) =>
          current + menu?.find((dish) => dish.id === order.dishId)?.price!
      );
      return menu?.find((dish) => dish.id === order.dishId)?.price;
    });
  };

  useEffect(() => {
    getTotal();
  }, [orderItems]);

  return (
    <div className="m-10 p-5 text-white bg-black">
      {orderItems?.map((order, index) => (
        <div key={order.dishId} className={`flex flex-col my-5`}>
          <h3 className="flex items-center text-3xl">
            <span className="mr-1">
              {menu?.find((dish) => dish.id === order.dishId)?.name}
            </span>
            <span>
              ({menu?.find((dish) => dish.id === order.dishId)?.price})
            </span>
          </h3>
        </div>
      ))}
      <span>{total}</span>
    </div>
  );
};
