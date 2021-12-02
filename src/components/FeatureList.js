import React, { useState } from "react";

import "../styles/FeatureList.scss";

import Error from "./Error";
import Feature from "./Feature";
import NoFeaturesVisible from "./NoFeaturesVisible";

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

    let featureName = span.previousSibling.childNodes[0].data;
    setFeatureToShow(featureArray.find((f) => f.name === featureName));
    toggle();
  }

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>{props.title}</h1>
          <div className="info-container">
            <div className="dialog"></div>
            <FeatureDialog
              isShowing={isShowing}
              hide={toggle}
              feature={featureToShow}
            />
            <ul className="" onClick={showFeature}>
              {featureArray.length !== 0 ? (
              featureArray.map((feature) => (
                <Feature key={feature.key} name={feature.name} />
              ))) : (
                <NoFeaturesVisible />
              )}
            </ul>
          </div>
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
