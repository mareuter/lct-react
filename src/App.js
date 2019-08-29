import React, { useEffect, useState, useRef } from "react";
import { Route } from "react-router-dom";
import jstz from "jstz";

import "./App.css";

import MainNav from "./components/MainNav";
import Welcome from "./components/Welcome";
import MoonInformation from "./components/MoonInformation";
import LunarClub from "./components/LunarClub";
import LunarIIClub from "./components/LunarIIClub";

import { getAverageTimezoneCoordinates } from "./AverageTimezoneCoordinates";

function getDate() {
  return new Date();
  // Near New Moon (old)
  // return new Date(2019, 7, 28, 4, 0, 0);
  // Near New Moon (new)
  //return new Date(2019, 8, 2, 7, 0, 0);
  // Near Full Moon
  // return new Date(2019, 7, 13, 4, 0, 0);
}

function getSecondsTimestamp(date) {
  return date.current.getTime() / 1000;
}

function App() {
  var date = useRef(getDate());
  var timezone = useRef(jstz.determine());
  var [coordinates, setCoordinates] = useState({
    latitude: 0.0,
    longitude: 0.0,
    good: false
  });

  useEffect(() => {
    function setLocation(position) {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        good: true
      });
    }

    function showError(error) {
      var message;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          message = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
        default:
          message = "An unknown error occurred.";
          break;
      }
      message += " Using average latitude/longitude from timezone.";
      message += " Inaccurate information shown in italics!";
      alert(message);
      let avgCoordinates = getAverageTimezoneCoordinates(
        timezone.current.name()
      );
      setCoordinates({
        latitude: avgCoordinates[0],
        longitude: avgCoordinates[1],
        good: false
      });
    }

    navigator.geolocation.getCurrentPosition(setLocation, showError);
  }, [coordinates.latitude, coordinates.longitude, coordinates.good, timezone]);

  return (
    <div className="App">
      <MainNav />
      <main className="App-main">
        <Route exact path="/" component={Welcome} />
        <Route
          path="/moon_info"
          render={props => (
            <MoonInformation
              {...props}
              date={getSecondsTimestamp(date)}
              timezone={timezone.current.name()}
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              coordinatesGood={coordinates.good}
            />
          )}
        />
        <Route
          path="/lunar_club"
          render={props => (
            <LunarClub
              {...props}
              date={getSecondsTimestamp(date)}
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
          )}
        />
        <Route
          path="/lunar_ii_club"
          render={props => (
            <LunarIIClub
              {...props}
              date={getSecondsTimestamp(date)}
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
          )}
        />
      </main>
    </div>
  );
}

export default App;
