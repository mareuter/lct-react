import React, { Component } from "react";
import { Route } from "react-router-dom";
import jstz from "jstz";

import "./App.css";

import MainNav from "./components/MainNav";
import MoonInformation from "./components/MoonInformation";
import LunarClub from "./components/LunarClub";
import LunarIIClub from "./components/LunarIIClub";

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
      timezone: jstz.determine()
    };
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(position) {
    console.log("set location");
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  getSecondsTimestamp() {
    return this.state.date.getTime() / 1000;
  }

  componentDidMount() {
    console.log("App did mount");
    navigator.geolocation.getCurrentPosition(this.setLocation);
  }

  render() {
    console.log("App render");
    return (
      <div className="App">
        <MainNav />
        <main className="App-main">
          <Route
            path="/moon_info"
            render={props => (
              <MoonInformation
                {...props}
                date={this.getSecondsTimestamp()}
                timezone={this.state.timezone.name()}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
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
