/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      order.options?.map((orderOption) => {
        setTotal(
          (current) =>
            current +
            menu
              ?.find((dish) => dish.id === order.dishId)
              ?.options?.find((option) => option.name === orderOption.name)
              ?.extra!
        );
        setTotal(
          (current) =>
            current +
            menu
              ?.find((dish) => dish.id === order.dishId)
              ?.options?.find((option) => option.name === orderOption.name)
              ?.choices?.find((choice) => choice.name === orderOption.choice)
              ?.extra!
        );
      });
    });
  };

  useEffect(() => {
    getTotal();
  }, [orderItems]);

  return (
    <div className="m-10 p-5 text-white bg-black">
      {orderItems?.map((order) => (
        <div key={order.dishId} className={`flex flex-col my-5`}>
          <h3 className="flex items-center text-3xl">
            <span className="mr-1">
              {menu?.find((dish) => dish.id === order.dishId)?.name}
            </span>
            <span>
              ({menu?.find((dish) => dish.id === order.dishId)?.price}￦)
            </span>
          </h3>
          {order.options?.map((orderOption, index) => (
            <div key={index}>
              <h4 className="flex items-center text-xl">
                <span className="mr-1">
                  {
                    menu
                      ?.find((dish) => dish.id === order.dishId)
                      ?.options?.find(
                        (option) => option.name === orderOption.name
                      )?.name
                  }
                </span>
                <span>
                  (
                  {
                    menu
                      ?.find((dish) => dish.id === order.dishId)
                      ?.options?.find(
                        (option) => option.name === orderOption.name
                      )?.extra
                  }
                  ￦)
                </span>
                <span className="mr-2">
                  <FontAwesomeIcon className="mx-3" icon={faArrowRight} />
                  {
                    menu
                      ?.find((dish) => dish.id === order.dishId)
                      ?.options?.find(
                        (option) => option.name === orderOption.name
                      )
                      ?.choices?.find(
                        (choice) => choice.name === orderOption.choice
                      )?.name
                  }
                </span>
                <span>
                  (
                  {
                    menu
                      ?.find((dish) => dish.id === order.dishId)
                      ?.options?.find(
                        (option) => option.name === orderOption.name
                      )
                      ?.choices?.find(
                        (choice) => choice.name === orderOption.choice
                      )?.extra
                  }
                  ￦)
                </span>
              </h4>
            </div>
          ))}
        </div>
      ))}
      <span>{total}</span>
    </div>
  );
};
