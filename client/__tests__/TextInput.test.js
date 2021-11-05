// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { TextInput } from "../components/TextInput";

describe("TextInput", () => {
  const todo = {
    id: 1,
    content: "my todo 1",
    completed: true,
  };

  const onChange = () => {
    //Some action here
  };
  it("It renders an input with a className that contains a tailwind utility (line-through) if todo.completed=true", () => {
    const { container } = render(<TextInput todo={todo} onChange={onChange} />);
    expect(container.firstChild).toHaveClass("line-through");
  });
});
