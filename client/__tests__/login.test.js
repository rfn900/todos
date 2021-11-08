/* eslint-env jest */
// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/login";

describe("Home", () => {
  it("Renders Nav and profile info", () => {
    render(<Home />);

    const button = screen.getByRole("button", {
      name: /login/i,
    });

    expect(button).toBeInTheDocument();
  });
});
