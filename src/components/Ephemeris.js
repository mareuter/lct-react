import React, { Component } from 'react';

import Error from './Error';
import { formatCoordinateLabel, formatDoubleLabel, formatTimeWithSeconds } from '../Formatters';

class Ephemeris extends Component {

    componentDidMount() {
        console.log('Ephemeris did mount');
    }

    componentDidUpdate(prevProps) {
        console.log('Ephemeris did update');
    }

    render() {
        const localTime = formatTimeWithSeconds(this.props.datetime,                                                      this.props.timezone, true);
        const localTimeParts = localTime.split(" ");
        const utcTime = formatTimeWithSeconds(this.props.datetime, 'UTC');
        const utcTimeParts = utcTime.split(" ");

        if (!this.props.error) {
            return (
                <div className="w3-container">
                    <div className="w3-row">
                        <div className="w3-third">
                            <p>Location:</p>
                        </div>
                        <div className="w3-third">
                            <p>{formatCoordinateLabel(this.props.latitude, 'N S')}</p>
                        </div>
                        <div className="w3-third">
                            <p>{formatCoordinateLabel(this.props.longitude, 'E W')}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-quarter">
                            <p>Local Date:</p>
                        </div>
                        <div className="w3-quarter">
                            <p>{localTimeParts[0]}</p>
                        </div>
                        <div className="w3-quarter">
                            <p>{localTimeParts[1]}</p>
                        </div>
                        <div className="w3-quarter">
                            <p>{localTimeParts[2]}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-third">
                            <p>UTC Date:</p>
                        </div>
                        <div className="w3-third">
                            <p>{utcTimeParts[0]}</p>
                        </div>
                        <div className="w3-third">
                            <p>{utcTimeParts[1]}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Age:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatDoubleLabel(this.props.moonInfo.age, ' days')}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Phase:</p>
                        </div>
                        <div className="w3-half">
                            <p>{this.props.moonInfo.phase}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Illumination:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatDoubleLabel(this.props.moonInfo.fractional_phase * 100, '%')}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Colongitude:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatCoordinateLabel(this.props.moonInfo.colong, null)}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Elongation:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatCoordinateLabel(this.props.moonInfo.elongation, null)}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Distance:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatDoubleLabel(this.props.moonInfo.earth_distance, ' km')}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Angular Size:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatDoubleLabel(this.props.moonInfo.angular_size, '°')}</p>
                        </div>
                    </div>
                    <div className="w3-row">
                        <div className="w3-half">
                            <p>Magnitude:</p>
                        </div>
                        <div className="w3-half">
                            <p>{formatDoubleLabel(this.props.moonInfo.magnitude, '')}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            console.log('Ephemeris: Render error')
            return <Error />
        }
    }
}

export default Ephemeris;