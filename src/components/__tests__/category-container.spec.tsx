import React from "react";
import { render } from "../../test-utils";
import { CategoryContainer } from "../category-container";

describe("<CategoryContainer />", () => {
  it("should render OK", () => {
    const categoryContainerProps = {
      id: "1",
      slug: "slugTest",
      coverImg: "coverImgTest",
      name: "nameTest",
    };
    const { container, getByText } = render(
      <CategoryContainer
        id={categoryContainerProps.id}
        slug={categoryContainerProps.slug}
        coverImg={categoryContainerProps.coverImg}
        name={categoryContainerProps.name}
      />
    );
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/category/${categoryContainerProps.slug}`
    );
    expect(container.firstChild?.firstChild?.firstChild).toHaveAttribute(
      "style",
      `background-image: url(${categoryContainerProps.coverImg});`
    );
    const name = getByText(categoryContainerProps.name);
    expect(container.firstChild?.firstChild?.firstChild?.nextSibling).toBe(
      name
    );
  });
});
