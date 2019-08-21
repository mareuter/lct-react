import React, { useState, useEffect } from "react";
import axios from "axios";

import Ephemeris from "./Ephemeris";
import NextFourPhases from "./NextFourPhases";
import PhaseAndLibration from "./PhaseAndLibration";
import SkyPosition from "./SkyPosition";

import "./MoonInformation.css"

import moonInfoJson from "../data/moonInfo.json";

function MoonInformation(props) {
  var [moonInfo, setMoonInfo] = useState(moonInfoJson);
  var [error, setError] = useState(false);

  useEffect(() => {
    let axiosCancelSource = axios.CancelToken.source();

    const config = {
      url: "https://lct-web-stage.herokuapp.com/moon_info",
      params: {
        date: props.date,
        tz: props.timezone,
        lat: props.latitude,
        lon: props.longitude
      },
      cancelToken: axiosCancelSource.token,
    };
    axios(config)
      .then(response => {
        setMoonInfo(response.data);
        setError(false);
      })
      .catch(error => {
        if (error.toString() !== "Cancel") {
          setError(true);
        }
      });
    return () => {
      axiosCancelSource.cancel();
    };
  }, [props.date, props.timezone, props.latitude, props.longitude]);

  useEffect(() => {
      let divs = document.getElementsByClassName("coord-check");
      for (var i = 0; i < divs.length; i++) {
        if (props.coordinatesGood) {
          divs[i].className = divs[i].className.replace(" bad-coords", "");
        } else {
          divs[i].className += " bad-coords";
        }
      }
  }, [props.coordinatesGood]);

  return (
    <div className="w3-container">
      <Ephemeris
        datetime={props.date}
        timezone={props.timezone}
        latitude={props.latitude}
        longitude={props.longitude}
        moonInfo={moonInfo}
        error={error}
      />
      <NextFourPhases
        timezone={props.timezone}
        moonInfo={moonInfo}
        error={error}
      />
      <PhaseAndLibration
        moonInfo={moonInfo}
        error={error}
      />
      <SkyPosition
        moonInfo={moonInfo}
        error={error}
      />
    </div>
  );
}

export default MoonInformation;
