import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import jstz from 'jstz';
import axios from 'axios';
import './App.css';

import MainNav from './components/MainNav';
import MoonInformation from './components/MoonInformation';
import LunarClub from './components/LunarClub';
import LunarIIClub from './components/LunarIIClub';

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
        <MainNav />
        <main className="App-main">
          <Route path="/moon_info" component={MoonInformation} />
          <Route path="/lunar_club" component={LunarClub} />
          <Route path="/lunar_club_ii" component={LunarIIClub} />
        </main>
      </div>
    );
  }
}

export default App;
