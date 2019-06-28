import React from 'react';

import Error from './Error';
import { formatDoubleLabel, formatRightAscension, formatTimeOnly } from '../Formatters';

function SkyPosition(props) {
    const hasError = props.error;
    const noTime = '----'
    const badDateTime = 'Invalid DateTime';

    var riseTime = noTime;
    var transitTime = noTime;
    var setTime = noTime;

    for (var key in props.moonInfo.rise_set_times) {
        const value = props.moonInfo.rise_set_times[key];
        const name = value['time'];
        const datetime = value['datetime'];
        var formattedDateTime = formatTimeOnly(datetime);
        if (formattedDateTime === badDateTime) {
            formattedDateTime = noTime;
        }
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
            <div className="w3-container">
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Altitude:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{formatDoubleLabel(props.moonInfo.altitude, '°')}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Azimuth:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{formatDoubleLabel(props.moonInfo.azimuth, '°')}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Right Ascension:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{formatRightAscension(props.moonInfo.ra)}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Declination:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{formatDoubleLabel(props.moonInfo.dec, '°')}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Rise Time:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{riseTime}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Transit Time:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{transitTime}</p>
                    </div>
                </div>
                <div className="w3-row">
                    <div className="w3-half">
                        <p>Set Time:</p>
                    </div>
                    <div className="w3-half w3-right-align">
                        <p>{setTime}</p>
                    </div>
                </div>
            </div>
        ) : (
            <Error />
        )}
        </div>
    );
}

export default SkyPosition;