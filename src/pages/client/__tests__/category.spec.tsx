import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route } from "react-router-dom";
import { Category, GET_CATEGORY_QUERY } from "../category";

describe("<Category />", () => {
  it("should render OK", async () => {
    await waitFor(async () => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: GET_CATEGORY_QUERY,
                variables: {
                  input: {
                    page: 1,
                    slug: "american",
                  },
                },
              },
              result: {
                data: {
                  getCategory: {
                    __typename: "GetCategoryOutput",
                    ok: true,
                    error: "error",
                    totalPages: 1,
                    totalResults: 6,
                    results: {
                      id: 1,
                      name: "name",
                      coverImg: "coverImg",
                      slug: "slg",
                      restaurantCount: 6,
                      __typename: "Category",
                    },
                    restaurants: [
                      {
                        id: 1,
                        name: "name",
                        coverImg: "coverImg",
                        category: {
                          name: "categoryName",
                          __typename: "Category",
                        },
                        address: "address",
                        isPromoted: true,
                        __typename: "Restaurant",
                      },
                    ],
                  },
                },
              },
            },
          ]}
        >
          <HelmetProvider>
            <MemoryRouter initialEntries={["category/american"]}>
              <Route path="category/:slug">
                <Category />
              </Route>
            </MemoryRouter>
          </HelmetProvider>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(document.title).toBe("Category | Tsuber Eats");
  });
});
