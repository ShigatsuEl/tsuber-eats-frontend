import { MockedProvider } from "@apollo/client/testing";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route } from "react-router-dom";
import { GET_RESTAURANT_QUERY, Restaurant } from "../restaurant";

const mocks = [
  {
    request: {
      query: GET_RESTAURANT_QUERY,
      variables: {
        input: {
          restaurantId: 1,
        },
      },
    },
    result: {
      data: {
        getRestaurant: {
          __typename: "GetRestaurantOutput",
          ok: true,
          error: "error",
          restaurant: {
            __typename: "Restaurant",
            id: 1,
            name: "name",
            coverImg: "coverImg",
            category: {
              __typename: "Category",
              name: "name",
            },
            address: "address",
            isPromoted: true,
          },
        },
      },
    },
  },
];

describe("<Restaurant />", () => {
  let renderResult: RenderResult;
  it("should render OK", async () => {
    await waitFor(async () => {
      renderResult = render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter initialEntries={["restaurant/1"]}>
            <Route path="restaurant/:id">
              <HelmetProvider>
                <Restaurant />
              </HelmetProvider>
            </Route>
          </MemoryRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.title).toBe(
      `${mocks[0].result.data.getRestaurant.restaurant.name} | Tsuber Eats`
    );
    const { getByTestId } = renderResult;
    const coverImgTest = getByTestId("restaurant-coverImg");
    const nameTest = getByTestId("restaurant-name");
    const categoryNameTest = getByTestId("restaurant-categoryName");
    const addressTest = getByTestId("restuarant-address");
    const {
      coverImg,
      name,
      category: { name: categoryName },
      address,
    } = mocks[0].result.data.getRestaurant.restaurant;
    expect(coverImgTest).toHaveAttribute(
      "style",
      `background-image: url(${coverImg});`
    );
    expect(nameTest).toHaveTextContent(name);
    expect(categoryNameTest).toHaveTextContent(categoryName);
    expect(addressTest).toHaveTextContent(address);
  });
});
