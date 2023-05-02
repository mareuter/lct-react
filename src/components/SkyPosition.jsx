import React, { useEffect, useState } from 'react';

import Error from './Error';
import { formatDoubleLabel, formatRightAscension, formatTimeOnly } from '../Formatters';

function SkyPosition(props) {
  const hasError = props.error;
  const noTime = '----';
  const badDateTime = 'Invalid DateTime';

  var [riseTime, setRiseTime] = useState(noTime);
  var [transitTime, setTransitTime] = useState(noTime);
  var [setTime, setSetTime] = useState(noTime);

  useEffect(() => {
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
          setRiseTime(formattedDateTime);
          break;
        case 'transit':
          setTransitTime(formattedDateTime);
          break;
        case 'set':
          setSetTime(formattedDateTime);
          break;
        default:
          break;
      }
    }
  }, [props.moonInfo.rise_set_times]);

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>Sky Position</h1>
          <div className="info-container">
            <div className="info-row coord-check">
              <p>Altitude:</p>
              <p>{formatDoubleLabel(props.moonInfo.altitude, '°')}</p>
            </div>
            <div className="info-row coord-check">
              <p>Azimuth:</p>
              <p>{formatDoubleLabel(props.moonInfo.azimuth, '°')}</p>
            </div>
            <div className="info-row coord-check">
              <p>Right Ascension:</p>
              <p>{formatRightAscension(props.moonInfo.ra)}</p>
            </div>
            <div className="info-row coord-check">
              <p>Declination:</p>
              <p>{formatDoubleLabel(props.moonInfo.dec, '°')}</p>
            </div>
            <div className="info-row coord-check">
              <p>Rise Time:</p>
              <p>{riseTime}</p>
            </div>
            <div className="info-row coord-check">
              <p>Transit Time:</p>
              <p>{transitTime}</p>
            </div>
            <div className="info-row coord-check">
              <p>Set Time:</p>
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
