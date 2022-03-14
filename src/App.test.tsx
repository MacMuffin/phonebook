import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";

test("renders without crash", () => {
  render(<App />);
  const headElement = screen.getByText(/Contact Form/i);
  expect(headElement).toBeInTheDocument();
});
