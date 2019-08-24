import React, { useEffect, useState } from "react";

import Error from "./Error";
import {
  formatDoubleLabel,
  formatRightAscension,
  formatTimeOnly
} from "../Formatters";

function SkyPosition(props) {
  const hasError = props.error;
  const noTime = "----";
  const badDateTime = "Invalid DateTime";

  var [riseTime, setRiseTime] = useState(noTime);
  var [transitTime, setTransitTime] = useState(noTime);
  var [setTime, setSetTime] = useState(noTime);

  useEffect(() => {
    for (var key in props.moonInfo.rise_set_times) {
      const value = props.moonInfo.rise_set_times[key];
      const name = value["time"];
      const datetime = value["datetime"];
      var formattedDateTime = formatTimeOnly(datetime);
      if (formattedDateTime === badDateTime) {
        formattedDateTime = noTime;
      }
      switch (name) {
        case "rise":
          setRiseTime(formattedDateTime);
          break;
        case "transit":
          setTransitTime(formattedDateTime);
          break;
        case "set":
          setSetTime(formattedDateTime);
          break;
        default:
          break;
      }
    }
  }, [props.moonInfo.rise_set_times]);

  return (
    <div>
      {!hasError ? (
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>Sky Position</h1>
          </div>
          <div className="compact">
            <div className="w3-row">
              <div className="w3-col s4">
                <p>Altitude:</p>
              </div>
              <div className="w3-col s8 w3-right-align coord-check">
                <p>{formatDoubleLabel(props.moonInfo.altitude, "°")}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s4">
                <p>Azimuth:</p>
              </div>
              <div className="w3-col s8 w3-right-align coord-check">
                <p>{formatDoubleLabel(props.moonInfo.azimuth, "°")}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s6">
                <p>Right Ascension:</p>
              </div>
              <div className="w3-col s6 w3-right-align coord-check">
                <p>{formatRightAscension(props.moonInfo.ra)}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s4">
                <p>Declination:</p>
              </div>
              <div className="w3-col s8 w3-right-align coord-check">
                <p>{formatDoubleLabel(props.moonInfo.dec, "°")}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s4">
                <p>Rise Time:</p>
              </div>
              <div className="w3-col s8 w3-right-align coord-check">
                <p>{riseTime}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s5">
                <p>Transit Time:</p>
              </div>
              <div className="w3-col s7 w3-right-align coord-check">
                <p>{transitTime}</p>
              </div>
            </div>
            <div className="w3-row">
              <div className="w3-col s4">
                <p>Set Time:</p>
              </div>
              <div className="w3-col s8 w3-right-align coord-check">
                <p>{setTime}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default SkyPosition;
