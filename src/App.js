import React, { Component } from "react";
import { Route } from "react-router-dom";
import jstz from "jstz";

import "./App.css";

import MainNav from "./components/MainNav";
import Welcome from "./components/Welcome";
import MoonInformation from "./components/MoonInformation";
import LunarClub from "./components/LunarClub";
import LunarIIClub from "./components/LunarIIClub";

import {getAverageTimezoneCoordinates} from "./AverageTimezoneCoordinates";

function getDate() {
  return new Date();
  // Near New Moon (old)
  // return new Date(2019, 7, 28, 4, 0, 0);
  // Near New Moon (new)
  //return new Date(2019, 8, 2, 7, 0, 0);
  // Near Full Moon
  // return new Date(2019, 7, 13, 4, 0, 0);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: getDate(),
      latitude: 0.0,
      longitude: 0.0,
      coordinatesGood: false,
      timezone: jstz.determine()
    };
    this.setLocation = this.setLocation.bind(this);
    this.showError = this.showError.bind(this);
  }

  showError(error) {
    var message;
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
      default:
        message = "An unknown error occurred."
        break;
    }
    message += " Using average latitude/longitude from timezone.";
    message += " Inaccurate information shown in italics!";
    alert(message);
    let coordinates = getAverageTimezoneCoordinates(this.state.timezone.name());
    this.setState({
      latitude: coordinates[0],
      longitude: coordinates[1],
      coordinatesGood: false
    });
  } 

  setLocation(position) {
    console.log("set location");
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      coordinatesGood: true
    });
  }

  getSecondsTimestamp() {
    return this.state.date.getTime() / 1000;
  }

  componentDidMount() {
    console.log("App did mount");
    navigator.geolocation.getCurrentPosition(this.setLocation, this.showError);
  }

  render() {
    console.log("App render");
    return (
      <div className="App">
        <MainNav />
        <main className="App-main">
          <Route exact path="/" component={Welcome}/>
          <Route
            path="/moon_info"
            render={props => (
              <MoonInformation
                {...props}
                date={this.getSecondsTimestamp()}
                timezone={this.state.timezone.name()}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                coordinatesGood={this.state.coordinatesGood}
              />
            )}
          />
          <Route
            path="/lunar_club"
            render={props => (
              <LunarClub
                {...props}
                date={this.getSecondsTimestamp()}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            )}
          />
          <Route
            path="/lunar_ii_club"
            render={props => (
              <LunarIIClub
                {...props}
                date={this.getSecondsTimestamp()}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
