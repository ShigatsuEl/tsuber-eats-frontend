import { render } from "@testing-library/react";
import React from 'react';
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("should render OK with props", () => {
    const { getByText } = render(<FormError errorMessage="Test" />);
    getByText("Test");
  });
});
