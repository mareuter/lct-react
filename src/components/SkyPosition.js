import React from 'react';

import Error from './Error';
import { formatDoubleLabel, formatRightAscension, formatTimeOnly } from '../Formatters';

function SkyPosition(props) {
    const hasError = props.error;
    const noTime = '----'

    var riseTime = noTime;
    var transitTime = noTime;
    var setTime = noTime;

    for (var key in props.moonInfo.rise_set_times) {
        const value = props.moonInfo.rise_set_times[key];
        const name = value['time'];
        const datetime = value['datetime'];
        const formattedDateTime = formatTimeOnly(datetime);
        switch (name) {
            case 'rise':
                riseTime = formattedDateTime;
                break;
            case 'transit':
                transitTime = formattedDateTime;
                break;
            case 'set':
                setTime = formattedDateTime;
                break;
            default:
                break;
        }
    }

    return(
        <div>
        {!hasError ? (
            <div>
                <p>Altitude: {formatDoubleLabel(props.moonInfo.altitude, '°')}</p>
                <p>Azimuth: {formatDoubleLabel(props.moonInfo.azimuth, '°')}</p>
                <p>Right Ascension: {formatRightAscension(props.moonInfo.ra)}</p>
                <p>Declination: {formatDoubleLabel(props.moonInfo.dec, '°')}</p>
                <p>Rise Time: {riseTime}</p>
                <p>Transit Time: {transitTime}</p>
                <p>Set Time: {setTime}</p>
            </div>
        ) : (
          <div>
            <Error />
          </div>
        )}
        </div>
    );
}

export default SkyPosition;