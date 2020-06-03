import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "../styles/Feature.scss";

function Feature(props) {
  return (
    <li className="info-row">
      <div>{props.name}</div>
      <div className="info-button">
        <FontAwesomeIcon icon={faInfoCircle} className="info" />
      </div>
    </li>
  );
}

export default Feature;
