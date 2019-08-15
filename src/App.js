import React, { Component } from "react";
import { Route } from "react-router-dom";
import jstz from "jstz";

import "./App.css";

import MainNav from "./components/MainNav";
import MoonInformation from "./components/MoonInformation";
import LunarClub from "./components/LunarClub";
import LunarIIClub from "./components/LunarIIClub";

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
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
          <Route path="/lunar_club_ii" component={LunarIIClub} />
        </main>
      </div>
    );
  }
}

export default App;
