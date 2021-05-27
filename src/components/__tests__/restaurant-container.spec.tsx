import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RestaurantContainer } from "../restaurant-container";

describe("<RestaurantContainer />", () => {
  it("should render OK with props", () => {
    const restaurantProps = {
      id: "1",
      coverImg: "coverImgTest",
      name: "nameTest",
      categoryName: "categoryNameTest",
      address: "addressTest",
    };
    const { container, getByText } = render(
      <Router>
        <RestaurantContainer {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    getByText(restaurantProps.address);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurant/${restaurantProps.id}`
    );
  });
});
