import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "../styles/Feature.scss";

function Feature(props) {
  return (
    <li className="w3-bar">
      <span className="w3-right info-button">
        <FontAwesomeIcon icon={faInfoCircle} className="info" />
      </span>
      <div>
        <span>{props.name}</span>
      </div>
    </li>
  );
}

export default Feature;
