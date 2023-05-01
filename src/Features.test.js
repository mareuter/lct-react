import { it, describe, expect } from 'vitest';

import { createFeatureArray } from "./Features";

let FEATURE_LIST = {
  0: [
    "Mare Crisium",
    555.921,
    16.1773714530001,
    59.103747264,
    14.845176696777372,
    19.018241882324197,
    "Mare",
    "Cleomedes",
    "LAC-44",
    "Lunar",
    "Naked Eye",
  ],
  1: [
    "Mare Fecunditatis",
    840.354,
    -7.83497446699994,
    53.6691487260001,
    27.8068885803223,
    22.5688514709472,
    "Mare",
    "Langrenus",
    "LAC-80",
    "Lunar",
    "Naked Eye",
  ],
  2: [
    "Mare Humorum",
    419.669,
    -24.4784597059999,
    -38.571605352999995,
    12.6219863891601,
    15.215297698975007,
    "Mare",
    "Mare Humorum",
    "LAC-93",
    "Lunar",
    "Naked Eye",
  ],
};

describe("Parse and Check Featues", () => {
  const features = createFeatureArray(FEATURE_LIST);

  it("Right Length", () => {
    expect(features.length).toBe(3);
  });

  it("First Feature Name", () => {
    expect(features[0].name).toBe(FEATURE_LIST[0][0]);
  });

  it("First Feature Diameter", () => {
    expect(features[0].diameter).toBe(FEATURE_LIST[0][1]);
  });

  it("Second Feature Latitude", () => {
    expect(features[1].latitude).toBe(FEATURE_LIST[1][2]);
  });

  it("Second Feature Longitude", () => {
    expect(features[1].longitude).toBe(FEATURE_LIST[1][3]);
  });

  it("Second Feature Type", () => {
    expect(features[1].type).toBe(FEATURE_LIST[1][6]);
  });

  it("Third Feature Quad Name", () => {
    expect(features[2].quadName).toBe(FEATURE_LIST[2][7]);
  });

  it("Third Feature Quad Code", () => {
    expect(features[2].quadCode).toBe(FEATURE_LIST[2][8]);
  });

  it("Third Feature Key", () => {
    expect(features[2].key).toBe(2);
  });
});
