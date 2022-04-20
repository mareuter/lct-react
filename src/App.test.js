import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResizeObserver } from "@juggle/resize-observer";

import { DateProvider } from "./DateContext";
import App from "./App";

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
global.ResizeObserver = ResizeObserver;

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
    const links = screen.getAllByRole("link");
    // for (var key in links[0]) {
    //   console.log(key + " -> " + links[0].innerHTML[key]);
    // }
    expect(links).toHaveLength(3);
    // const LINK_NAMES = ["Moon Info Tab", "Lunar Club Tab", "Lunar 2 Club Tab"];
    // links.forEach((link) => {
    //   // console.log(link);
    //   expect(LINK_NAMES.includes(link.name)).toBe(true);
    // });
    // expect(screen.getByRole("img", { name: "Lunar Club Tools" })).toHaveLength(1);
  });

  test("Renders Moon Info tab route", async () => {
    customRender(<App />);
    await userEvent.click(
      screen.getByRole("link", { name: "Moon Info Tab Moon Info" })
    );
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(4);
    // const DIV_NAMES = [
    //   "Ephemeris",
    //   "Next Four Phases",
    //   "Phase and Libration",
    //   "Sky Position",
    // ];
    // headings.forEach((heading) => {
    //   expect(DIV_NAMES.includes(heading.outerText)).toBe(true);
    // });
  });

  test("Renders Lunar Club tab route", async () => {
    customRender(<App />);
    await userEvent.click(
      screen.getByRole("link", { name: "Lunar Club Tab Lunar Club" })
    );
    const headings = screen.getAllByRole("heading", { level: 1 });
    // console.log(headings)
    expect(headings.length).toBe(4);
    // const DIV_NAMES = ["Special", "Naked Eye", "Binocular", "Tele"];
    // headings.forEach((heading) => {
    //   expect(DIV_NAMES.includes(heading.name));
    // });
  });

  test("Renders Lunar 2 Club tab route", async () => {
    customRender(<App />);
    await userEvent.click(
      screen.getByRole("link", { name: "Lunar 2 Club Tab Lunar II Club" })
    );
    const headings = screen.getAllByRole("heading", { level: 1 });
    // console.log(headings)
    expect(headings.length).toBe(2);
    // const DIV_NAMES = ["Special", "Naked Eye", "Binocular", "Tele"];
    // headings.forEach((heading) => {
    //   expect(DIV_NAMES.includes(heading.name));
    // });
  });
});
