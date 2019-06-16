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
                    <p>Age: {formatDoubleLabel(this.props.moonInfo.age, ' days')}</p>
                    <p>Phase: {this.props.moonInfo.phase}</p>
                    <p>Illumination: {formatDoubleLabel(this.props.moonInfo.fractional_phase * 100, '%')}</p>
                    <p>Colongitude: {formatCoordinateLabel(this.props.moonInfo.colong, null)}</p>
                    <p>Elongation: {formatCoordinateLabel(this.props.moonInfo.elongation, null)}</p>
                    <p>Distance: {formatDoubleLabel(this.props.moonInfo.earth_distance, ' km')}</p>
                    <p>Angular Size: {formatDoubleLabel(this.props.moonInfo.angular_size, '°')}</p>
                    <p>Magnitude: {formatDoubleLabel(this.props.moonInfo.magnitude, '')}</p>
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