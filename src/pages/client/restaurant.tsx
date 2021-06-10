import { useMutation, useQuery } from "@apollo/client";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React, { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Bill } from "../../components/bill";
import { Dish } from "../../components/dish";
import { DishOption } from "../../components/dish-option";
import { DishOptionChoice } from "../../components/dish-option-choice";
import Loading from "../../components/loading";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
} from "../../__generated__/CreateOrderMutation";
import {
  GetRestaurantQuery,
  GetRestaurantQueryVariables,
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
      orderId
    }
  }
`;

interface IParams {
  id: string;
}

export const Restaurant = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [isOrderStart, setIsOrderStart] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
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
  const [createOrder, { loading: createOrderLoading }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  /* common */

  const triggerStartOrder = () => {
    setIsOrderStart(true);
  };

  const triggerCancelOrder = () => {
    setIsOrderStart(false);
    setOrderItems([]);
  };

  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Please select an order");
      return;
    }
    const ok = window.confirm("May I take your order?");
    if (ok) {
      createOrder({
        variables: {
          input: {
            restaurantId: +restaurantId,
            items: orderItems,
          },
        },
      });
    }
  };

  function onCompleted(data: CreateOrderMutation) {
    if (createOrderLoading) {
      return;
    }
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`);
    }
  }

  /* Item Order */

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

  /* Item Option Order */

  const addOptionToItem = (dishId: number, optionName: string) => {
    const prevItem = getItem(dishId);
    if (prevItem) {
      const hasOption = Boolean(
        prevItem.options?.find((prevOption) => prevOption.name === optionName)
      );
      if (!hasOption) {
        // 상태관리를 위해 reset 후, 선언
        removeItemFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...prevItem.options!] },
          ...current,
        ]);
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
    return false;
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected) {
      return;
    }
    const prevItem = getItem(dishId);
    if (prevItem) {
      // 상태관리를 위해 reset 후, 선언
      removeItemFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: prevItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
    }
  };

  /* Item Option Choice Order */

  const addOptionChoiceToItem = (
    dishId: number,
    optionName: string,
    choiceName: string
  ) => {
    const prevItem = getItem(dishId);
    if (prevItem) {
      const hasNameOption = Boolean(
        prevItem.options?.find((prevOption) => prevOption.name === optionName)
      );
      const hasChoiceOption = Boolean(
        prevItem.options?.find((prevOption) => prevOption.choice === choiceName)
      );
      if (!hasNameOption) {
        if (!hasChoiceOption) {
          // 상태관리를 위해 reset 후, 선언
          // option name과 choice가 orderItems에 존재하지 않는 경우
          removeItemFromOrder(dishId);
          setOrderItems((current) => [
            {
              dishId,
              options: [
                { name: optionName, choice: choiceName },
                ...prevItem.options!,
              ],
            },
            ...current,
          ]);
        }
      } else {
        if (!hasChoiceOption) {
          // 상태관리를 위해 reset 후, 선언
          // option name이 같은 orderItem이 존재하고 choice가 같지 않은 경우 변경하려는 option을 초기화한다.
          removeItemFromOrder(dishId);
          setOrderItems((current) => [
            {
              dishId,
              options: [
                { name: optionName, choice: choiceName },
                ...prevItem.options?.filter(
                  (option) => option.name !== optionName
                )!,
              ],
            },
            ...current,
          ]);
        }
      }
    }
  };

  const getOptionChoiceFromItem = (
    item: CreateOrderItemInput,
    choiceName: string
  ) => {
    return item.options?.find((option) => option.choice === choiceName);
  };

  const isOptionChoiceSelected = (dishId: number, choiceName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionChoiceFromItem(item, choiceName));
    }
    return false;
  };

  const removeOptionChoiceFromItem = (dishId: number, choiceName: string) => {
    if (!isSelected) {
      return;
    }
    const prevItem = getItem(dishId);
    if (prevItem) {
      // 상태관리를 위해 reset 후, 선언
      removeItemFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: prevItem.options?.filter(
            (option) => option.choice !== choiceName
          ),
        },
        ...current,
      ]);
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
          {!isOrderStart && (
            <button
              onClick={triggerStartOrder}
              className="btn py-3 px-5 mt-10 ml-10"
            >
              Start Order
            </button>
          )}
          {isOrderStart && (
            <>
              <button
                onClick={triggerConfirmOrder}
                className="btn py-3 px-5 mt-10 ml-10"
              >
                Confirm Order
              </button>
              <button
                onClick={triggerCancelOrder}
                className="btn py-3 px-5 mt-10 ml-10 bg-black opacity-80 hover:bg-black hover:opacity-100"
              >
                Cancel Order
              </button>
            </>
          )}
          {isOrderStart && orderItems.length !== 0 && (
            <Bill
              menu={data?.getRestaurant.restaurant?.menu}
              orderItems={orderItems}
            />
          )}
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
                    <DishOption
                      key={index}
                      index={index}
                      option={option}
                      dish={dish}
                      isOrderStart={isOrderStart}
                      isSelected={isOptionSelected(dish.id, option.name)}
                      addOptionToItem={() =>
                        addOptionToItem(dish.id, option.name)
                      }
                      removeOptionFromItem={removeOptionFromItem}
                    >
                      {option.choices &&
                        option.choices.map((choice, index) => (
                          <DishOptionChoice
                            key={index}
                            name={choice.name}
                            extra={choice.extra}
                            isOrderStart={isOrderStart}
                            isOptionChoiceSelected={isOptionChoiceSelected(
                              dish.id,
                              choice.name
                            )}
                            addOptionChoiceToItem={() =>
                              addOptionChoiceToItem(
                                dish.id,
                                option.name,
                                choice.name
                              )
                            }
                            removeOptionChoiceFromItem={() =>
                              removeOptionChoiceFromItem(dish.id, choice.name)
                            }
                          />
                        ))}
                    </DishOption>
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
