import React, { useState } from "react";

import "./FeatureList.css";

import Error from "./Error";
import Feature from "./Feature";

import { useModal } from "./Hooks";
import FeatureDialog from "./FeatureDialog";

import { createFeatureArray } from "../Features";

function FeatureList(props) {
  const hasError = props.error;
  let featureArray = createFeatureArray(props.features);
  let [isShowing, toggle] = useModal();
  let [featureToShow, setFeatureToShow] = useState(null);

  function showFeature(event) {
    let target = event.target ? event.target : event.srcElement;
    let span = null;
    if (target.nodeName === "svg") {
      span = target.parentElement;
    }
    if (target.nodeName === "path") {
      span = target.parentElement.parentElement;
    }
    if (span === null) {
      return;
    }
    let featureName = span.nextSibling.childNodes[0].innerHTML;
    setFeatureToShow(featureArray.find(f => f.name === featureName));
    toggle();
  }

  return (
    <div>
      {!hasError ? (
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>{props.title}</h1>
          </div>
          <FeatureDialog
            isShowing={isShowing}
            hide={toggle}
            feature={featureToShow}
          />
          <ul className="w3-ul" onClick={showFeature}>
            {featureArray.map(feature => (
              <Feature key={feature.key} name={feature.name} />
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
