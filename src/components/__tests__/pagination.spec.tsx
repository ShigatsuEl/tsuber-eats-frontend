import React from "react";
import { render } from "../../test-utils";
import { Pagination } from "../pagination";

describe("<Pagination />", () => {
  it("should render OK", () => {
    const paginationProps = {
      page: 5,
      setPage: jest.fn(),
      totalPages: 10,
    };
    const { getByTestId } = render(
      <Pagination
        page={paginationProps.page}
        setPage={paginationProps.setPage}
        totalPages={paginationProps.totalPages}
      />
    );
    const leftBtn = getByTestId("left-btn");
    const rightBtn = getByTestId("right-btn");
    const paginationText = getByTestId("paginataion-text");
    expect(paginationText).toHaveTextContent(
      `Page ${paginationProps.page} of ${paginationProps.totalPages}`
    );
    expect(leftBtn).not.toBeNull();
    expect(rightBtn).not.toBeNull();
  });
});
