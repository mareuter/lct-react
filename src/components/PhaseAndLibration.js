import React from 'react';

import Error from './Error';
import { formatDoubleLabel } from '../Formatters';

function PhaseAndLibration(props) {
    const hasError = props.error;

    return (
        <div>
        {!hasError ? (
            <div>
                <p>Libration Latitude: {formatDoubleLabel(props.moonInfo.libration_lat, '°')}</p>
                <p>Libration Longitude: {formatDoubleLabel(props.moonInfo.libration_lon, '°')}</p>
                <p>SubSolar Latitude: {formatDoubleLabel(props.moonInfo.subsolar_lat, '°')}</p>
            </div>
        ) : (
          <div>
            <Error />
          </div>
        )}
        </div>
    );
}

export default PhaseAndLibration;