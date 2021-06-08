import { useQuery } from "@apollo/client";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Dish } from "../../components/dish";
import Loading from "../../components/loading";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  GetRestaurantQuery,
  GetRestaurantQueryVariables,
  GetRestaurantQuery_getRestaurant_restaurant_menu,
} from "../../__generated__/GetRestaurantQuery";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

export const GET_RESTAURANT_QUERY = gql`
  query GetRestaurantQuery($input: GetRestaurantInput!) {
    getRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantResults
        menu {
          ...DishResults
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const Restaurant = () => {
  const { id: restaurantId } = useParams<IParams>();
  const { data, loading } = useQuery<
    GetRestaurantQuery,
    GetRestaurantQueryVariables
  >(GET_RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +restaurantId,
      },
    },
  });
  const [isOrderStart, setIsOrderStart] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  // console.log(data);
  console.log(orderItems);

  const triggerStartOrder = () => {
    setIsOrderStart((current) => !current);
  };

  const getItem = (dishId: number) =>
    orderItems.find((order) => order.dishId === dishId);

  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };

  const removeItemFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };

  const addOptionToItem = (dishId: number, option: any) => {
    const prevItem = getItem(dishId);
    if (prevItem) {
      const hasOption = Boolean(
        prevItem.options?.find((prevOption) => prevOption.name === option.name)
      );
      if (!hasOption) {
        removeItemFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [option, ...prevItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const onItemOptionClick = (
    event: React.MouseEvent<HTMLElement>,
    dish: GetRestaurantQuery_getRestaurant_restaurant_menu,
    option: any
  ) => {
    if (isOrderStart) {
      if (isSelected(dish.id) && addOptionToItem) {
        addOptionToItem(dish.id, { name: option.name });
      }
    }
  };

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <HelmetProvider>
            <title>{data?.getRestaurant.restaurant?.name} | Tsuber Eats</title>
          </HelmetProvider>
          <div
            data-testid="restaurant-coverImg"
            className="relative py-40 px-10 bg-cover bg-center bg-gray-800"
            style={{
              backgroundImage: `url(${data?.getRestaurant.restaurant?.coverImg})`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 px-10 pb-5 text-white bg-gradient-to-t from-black">
              <h4
                data-testid="restaurant-name"
                className="pb-2 font-semibold text-4xl"
              >
                {data?.getRestaurant.restaurant?.name}
              </h4>
              <span className="group">
                <FontAwesomeIcon icon={faUtensils} />
                <Link
                  data-testid="restaurant-categoryName"
                  to={`/category/${data?.getRestaurant.restaurant?.category?.name}`}
                  className="mx-3 capitalize group-hover:text-lime-600"
                >
                  {data?.getRestaurant.restaurant?.category?.name}
                </Link>
              </span>
              <h5
                data-testid="restuarant-address"
                className="flex items-center text-xl"
              >
                {data?.getRestaurant.restaurant?.address}
              </h5>
            </div>
          </div>
          <button
            onClick={triggerStartOrder}
            className="btn py-3 px-5 mt-10 ml-10"
          >
            {isOrderStart ? "Ordering" : "Start Order"}
          </button>
          {data?.getRestaurant.restaurant?.menu.length !== 0 && (
            <div className="grid-container m-10">
              {data?.getRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish
                  key={index}
                  id={dish.id}
                  name={dish.name}
                  price={dish.price}
                  description={dish.description}
                  isCustomer={true}
                  isOrderStart={isOrderStart}
                  isSelected={isSelected(dish.id)}
                  options={dish.options}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                >
                  {dish.options?.map((option, index) => (
                    <span
                      key={index}
                      className={`flex items-center text-lg font-semibold ${
                        isOptionSelected(dish.id, option.name) &&
                        "bg-lime-500 opacity-100"
                      } ${
                        dish.options?.length! - 1 === index ? "mb-0" : "mb-3"
                      }`}
                      onClick={(event) =>
                        onItemOptionClick(event, dish, option)
                      }
                    >
                      <h6 className="mr-2 opacity-70">{option.name}</h6>
                      <h6 className="opacity-70">{option.extra}￦</h6>
                    </span>
                  ))}
                </Dish>
              ))}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};
