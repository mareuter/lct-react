import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import { DateProvider } from "./DateContext";
import App from "./App";

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
global.navigator.geolocation = mockGeolocation;

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <DateProvider date={new Date()}>{children}</DateProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe("Does the app render", () => {
  test("Renders default route", () => {
    customRender(<App />);
    expect(screen.getByAltText("Moon Info Tab"));
    expect(screen.getByAltText("Lunar Club Tab"));
    expect(screen.getByAltText("Lunar 2 Club Tab"))
    expect(screen.getByAltText("Lunar Club Tools"));
  });
});
