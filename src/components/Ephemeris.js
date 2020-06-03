import React from "react";

import Error from "./Error";
import {
  formatCoordinateLabel,
  formatDoubleLabel,
  formatTimeWithSeconds,
} from "../Formatters";

function Ephemeris(props) {
  const hasError = props.error;
  const localTime = formatTimeWithSeconds(
    props.datetime,
    props.timezone,
    true,
    true
  );
  const pos = localTime.lastIndexOf(" ");
  const localDateTime = localTime.slice(0, pos);
  const localTimeZone = localTime.slice(pos + 1, localTime.length);
  const utcTime = formatTimeWithSeconds(props.datetime, "UTC");
  let latitude = formatCoordinateLabel(props.latitude, "N S");
  let longitude = formatCoordinateLabel(props.longitude, "E W");
  let coordinateStr = latitude + " " + longitude;

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>Ephemeris</h1>
          <div className="info-container">
            <div className="info-row">
              <p>Location:</p>
              <p>{coordinateStr}</p>
            </div>
            <div className="info-row">
              <p>Date&nbsp;({localTimeZone}):</p>
              <p>{localDateTime}</p>
            </div>
            <div className="info-row">
              <p>Date&nbsp;(UTC):</p>
              <p>{utcTime}</p>
            </div>
            <div className="info-row">
              <p>Age:</p>
              <p>{formatDoubleLabel(props.moonInfo.age, " days")}</p>
            </div>
            <div className="info-row">
              <p>Phase:</p>
              <p>{props.moonInfo.phase}</p>
            </div>
            <div className="info-row">
              <p>Illumination:</p>
              <p>
                {formatDoubleLabel(props.moonInfo.fractional_phase * 100, "%")}
              </p>
            </div>
            <div className="info-row">
              <p>Colongitude:</p>
              <p>{formatCoordinateLabel(props.moonInfo.colong, null)}</p>
            </div>
            <div className="info-row">
              <p>Elongation:</p>
              <p>{formatCoordinateLabel(props.moonInfo.elongation, null)}</p>
            </div>
            <div className="info-row coord-check">
              <p>Distance:</p>
              <p>{formatDoubleLabel(props.moonInfo.earth_distance, " km")}</p>
            </div>
            <div className="info-row coord-check">
              <p>Angular&nbsp;Size:</p>
              <p>{formatDoubleLabel(props.moonInfo.angular_size, "°")}</p>
            </div>
            <div className="info-row">
              <p>Magnitude:</p>
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
