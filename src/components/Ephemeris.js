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

    renderItems() {
        if (!this.props.error) {
            return (
                <div>
                    <p>Location: {formatCoordinateLabel(this.props.latitude, 'N S')}&nbsp;&nbsp; 
                                 {formatCoordinateLabel(this.props.longitude, 'E W')}</p>
                    <p>Local Date: {formatTimeWithSeconds(this.props.datetime, this.props.timezone, true)}</p>
                    <p>UTC Date: {formatTimeWithSeconds(this.props.datetime, 'UTC')}</p>
                    <p>Age: {formatDoubleLabel(this.props.moon_info.age, ' days')}</p>
                    <p>Phase: {this.props.moon_info.phase}</p>
                    <p>Illumination: {formatDoubleLabel(this.props.moon_info.fractional_phase * 100, '%')}</p>
                    <p>Colongitude: {formatCoordinateLabel(this.props.moon_info.colong, null)}</p>
                    <p>Elongation: {formatCoordinateLabel(this.props.moon_info.elongation, null)}</p>
                    <p>Distance: {formatDoubleLabel(this.props.moon_info.earth_distance, ' km')}</p>
                    <p>Angular Size: {formatDoubleLabel(this.props.moon_info.angular_size, '°')}</p>
                    <p>Magnitude: {formatDoubleLabel(this.props.moon_info.magnitude, '')}</p>
                </div>
            );
        } else {
            console.log('Ephemeris: Render error')
            return <Error />
        }
    }

    render() {
        console.log('Ephemeris render');
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}

export default Ephemeris;