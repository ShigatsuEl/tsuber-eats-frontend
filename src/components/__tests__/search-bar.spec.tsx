import React from "react";
import { render, RenderResult } from "../../test-utils";
import { SearchBar } from "../search-bar";

describe("<SearchBar />", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<SearchBar className="search-bar" />);
  });

  it("should be render with props", () => {
    const { getByTestId } = renderResult;
    const searchBar = getByTestId("search-bar");
    expect(searchBar).toHaveClass("search-bar");
  });
});
