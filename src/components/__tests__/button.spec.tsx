import { render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render Test", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} actionText={"Test"} />
    );
    getByText("Test");
  });

  it("should render Loading...", () => {
    const { getByText } = render(
      <Button canClick={true} loading={true} actionText={"Test"} />
    );
    getByText("Loading...");
  });

  it("should have className with canClick={true} prop", () => {
    const { container } = render(
      <Button canClick={true} loading={false} actionText={"Test"} />
    );
    expect(container.firstChild).toHaveClass("bg-lime-600 hover:bg-lime-700");
  });

  it("should have className with canClick={false} prop", () => {
    const { container } = render(
      <Button canClick={false} loading={false} actionText={"Test"} />
    );
    expect(container.firstChild).toHaveClass("bg-gray-200 pointer-events-none");
  });
});
