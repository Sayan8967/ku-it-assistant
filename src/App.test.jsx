// src/App.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as hfClient from "./api/hfClient";

test("renders input and sends query", async () => {
  jest.spyOn(hfClient, "queryLLM").mockResolvedValue("Test answer");
  render(<App />);
  const input = screen.getByPlaceholderText(/Ask KU IT anything/i);
  fireEvent.change(input, { target: { value: "What is CAB?" } });
  fireEvent.click(screen.getByText(/Ask/i));
  expect(await screen.findByText("You: What is CAB?")).toBeInTheDocument();
  expect(await screen.findByText("Assistant: Test answer")).toBeInTheDocument();
});
