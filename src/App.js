import React, { useEffect, useState, useRef } from "react";
import { Route } from "react-router-dom";
import jstz from "jstz";

import "./App.css";

import MainNav from "./components/MainNav";
import Welcome from "./components/Welcome";
import MoonInformation from "./components/MoonInformation";
import LunarClub from "./components/LunarClub";
import LunarIIClub from "./components/LunarIIClub";

import { useDateValue } from "./DateContext";
import { getAverageTimezoneCoordinates } from "./AverageTimezoneCoordinates";

function App() {
  let date = useDateValue().date;
  var timezone = useRef(jstz.determine());
  var [coordinates, setCoordinates] = useState({
    latitude: 0.0,
    longitude: 0.0,
    good: false
  });

  function getSecondsTimestamp(dt) {
    return dt.getTime() / 1000;
  }

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
