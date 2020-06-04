import React from "react";

import "../styles/PhaseAndLibration.scss";

import Error from "./Error";
import { formatDoubleLabel } from "../Formatters";
import MoonPhase from "./MoonPhase";

function PhaseAndLibration(props) {
  const hasError = props.error;

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>Phase and Libration</h1>
          <div className="canvas">
            <MoonPhase
              libration={{
                lon: props.moonInfo.libration_lon,
                lat: props.moonInfo.libration_lat,
              }}
              solarElongation={props.moonInfo.elongation}
              subSolarLatitude={props.moonInfo.subsolar_lat}
            />
          </div>
          <div className="info-container">
            <div className="info-row">
              <p>Libration Latitude:</p>
              <p>{formatDoubleLabel(props.moonInfo.libration_lat, "°")}</p>
            </div>
            <div className="info-row">
              <p>Libration Longitude:</p>
              <p>{formatDoubleLabel(props.moonInfo.libration_lon, "°")}</p>
            </div>
            <div className="info-row">
              <p>SubSolar Latitude:</p>
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
