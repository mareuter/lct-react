import React, { Component } from 'react';
import jstz from 'jstz';
import axios from 'axios';
import './App.css';

import Ephemeris from './components/Ephemeris';

import moon_info from './data/moon_info.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
      date: new Date(),
      latitude: 0.0,
      longitude: 0.0,
      timezone: jstz.determine(),
      moon_info: moon_info,
      error: false
    }
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(position) {
    console.log('set location')
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  getSecondsTimestamp() {
    return this.state.date.getTime() / 1000;
  }

  componentDidMount() {
    console.log('App did mount')
    navigator.geolocation.getCurrentPosition(this.setLocation);

    const config = {
        url: 'https://lct-web-stage.herokuapp.com/moon_info',
        params: {
            date: this.getSecondsTimestamp(),
            tz: this.state.timezone.name(),
            lat: this.state.latitude,
            lon: this.state.longitude
        }
    }
    axios(config).then((response) => {
        this.setState({
            moon_info: response.data
        })
    })
    .catch((error) => {
        this.setState({
            error: true
        })
        console.log(error.request);
    });
  }

  render() {
    console.log('App render');
    return (
      <div className="App">
        <main className="App-main">
          <Ephemeris 
            moon_info={this.state.moon_info}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            error={this.state.error}
          />
        </main>
      </div>
    );
  }
}

export default App;
