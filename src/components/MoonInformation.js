import React, { Component } from 'react';
import axios from 'axios';

import Ephemeris from './Ephemeris';
import NextFourPhases from './NextFourPhases';
import PhaseAndLibration from './PhaseAndLibration';
import SkyPosition from './SkyPosition';

import moonInfo from '../data/moonInfo.json';

class MoonInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moonInfo: moonInfo,
            error: false
        }
    }

    componentDidMount() {
        const config = {
            url: 'https://lct-web-stage.herokuapp.com/moon_info',
            params: {
                date: this.props.date,
                tz: this.props.timezone,
                lat: this.props.latitude,
                lon: this.props.longitude
            }
        }
        axios(config).then((response) => {
            this.setState({
                moonInfo: response.data
            })
        })
        .catch((error) => {
            this.setState({
                error: true
            })
        });            
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date || 
            prevProps.timezone !== this.props.timezone ||
            prevProps.latitude !== this.props.latitude ||
            prevProps.longitude !== this.props.longitude
            ) {
                const config = {
                    url: 'https://lct-web-stage.herokuapp.com/moon_info',
                    params: {
                        date: this.props.date,
                        tz: this.props.timezone,
                        lat: this.props.latitude,
                        lon: this.props.longitude
                    }
                }
                axios(config).then((response) => {
                    this.setState({
                        moonInfo: response.data
                    })
                })
                .catch((error) => {
                    this.setState({
                        error: true
                    })
                }); 
        }
    }

    render() {
        return (
            <div className="w3-container">
                <Ephemeris datetime={this.props.date}
                            timezone={this.props.timezone}
                            latitude={this.props.latitude}
                            longitude={this.props.longitude}
                            moonInfo={this.state.moonInfo}
                            error={this.state.error}
                />
                <NextFourPhases timezone={this.props.timezone}
                                moonInfo={this.state.moonInfo}
                                error={this.state.error}
                />
                <PhaseAndLibration moonInfo={this.state.moonInfo}
                                    error={this.state.error}
                />
                <SkyPosition moonInfo={this.state.moonInfo}
                                error={this.state.error}
                />
            </div>
        );
    }
}

export default MoonInformation;