import React from "react";

import Error from "./Error";
import {
  formatCoordinateLabel,
  formatDoubleLabel,
  formatTimeWithSeconds
} from "../Formatters";

function Ephemeris(props) {
  const hasError = props.error;
  const localTime = formatTimeWithSeconds(props.datetime, props.timezone, true);
  const utcTime = formatTimeWithSeconds(props.datetime, "UTC");

  return (
    <div>
      {!hasError ? (
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>Ephemeris</h1>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Location:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>
                {formatCoordinateLabel(props.latitude, "N S")}
                &nbsp;&nbsp;
                {formatCoordinateLabel(props.longitude, "E W")}
              </p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Local Date:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{localTime}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>UTC Date:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{utcTime}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Age:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatDoubleLabel(props.moonInfo.age, " days")}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Phase:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{props.moonInfo.phase}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Illumination:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>
                {formatDoubleLabel(props.moonInfo.fractional_phase * 100, "%")}
              </p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Colongitude:</p>
            </div>
            <div className="w3-half w3-right-align ">
              <p>{formatCoordinateLabel(props.moonInfo.colong, null)}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Elongation:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatCoordinateLabel(props.moonInfo.elongation, null)}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Distance:</p>
            </div>
            <div className="w3-half w3-right-align coord-check">
              <p>{formatDoubleLabel(props.moonInfo.earth_distance, " km")}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Angular Size:</p>
            </div>
            <div className="w3-half w3-right-align coord-check">
              <p>{formatDoubleLabel(props.moonInfo.angular_size, "°")}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Magnitude:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{formatDoubleLabel(props.moonInfo.magnitude, "")}</p>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Ephemeris;
