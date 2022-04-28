import { render, screen } from "@testing-library/react";
import Home from "../views/Home";
import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { useNavigate } from "react-router-dom";
import Users from "../views/Users";

describe('as', () => {
  test("1+1", () => {
    expect(1 + 1).toEqual(2);
  });
  
  it("sads", () => {
    expect(1 + 2).toEqual(3);
  });
  
  it("renders home view", () => {
    render(<App />);
  });
  
  it("renders users", () => {
    render(<Users />);
  });
});
