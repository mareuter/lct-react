import React from "react";

import Error from "./Error";
import { formatDoubleLabel } from "../Formatters";

function PhaseAndLibration(props) {
  const hasError = props.error;

  return (
    <div>
      {!hasError ? (
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>Phase and Libration</h1>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Libration Latitude:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatDoubleLabel(props.moonInfo.libration_lat, "°")}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Libration Longitude:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatDoubleLabel(props.moonInfo.libration_lon, "°")}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>SubSolar Latitude:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatDoubleLabel(props.moonInfo.subsolar_lat, "°")}</p>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default PhaseAndLibration;
