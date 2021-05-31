import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route } from "react-router-dom";
import { Restaurants } from "../restaurants";

jest.mock("../../../hooks/useRestaurants", () => ({
  useRestaurants: () => ({
    data: {
      getAllCategories: {
        __typename: "GetCategoriesOutput",
        ok: true,
        error: "error",
        categories: [
          {
            __typename: "Category",
            id: 1,
            name: "name",
            coverImg: "coverImg",
            slug: "slug",
          },
        ],
      },
      getAllRestaurants: {
        __typename: "GetRestaurantsOutput",
        ok: true,
        error: "error",
        totalPages: 1,
        totalResults: 6,
        results: [
          {
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
        ],
      },
    },
  }),
}));

describe("<Restaurants />", () => {
  it("should render OK", async () => {
    await waitFor(async () => {
      render(
        <BrowserRouter>
          <Route>
            <HelmetProvider>
              <Restaurants />
            </HelmetProvider>
          </Route>
        </BrowserRouter>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.title).toBe("Restaurants | Tsuber Eats");
  });
});
