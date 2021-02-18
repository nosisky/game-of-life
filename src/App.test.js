import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders game of life text", () => {
  render(<App />);
  const linkElement = screen.getByText(/game of life/i);
  expect(linkElement).toBeInTheDocument();
});
