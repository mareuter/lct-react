import React from "react";

import "./FeatureList.css";

import Error from "./Error";
import Feature from "./Feature";

import { createFeatureArray } from "../Features";

function FeatureList(props) {
  const hasError = props.error;
  let featureArray = createFeatureArray(props.features);

  return (
    <div>
      {!hasError ? (
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>{props.title}</h1>
          </div>
          <ul className="w3-ul">
            {featureArray.map(feature => (
              <Feature key={feature.key} name={feature.name} type={feature.type} />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <Error />
        </div>
      )}
    </div>
  );
}

export default FeatureList;
