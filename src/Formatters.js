import { DateTime } from 'luxon';

const formatDoubleValue = (value) => {
    const decimalPlaces = 2;
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces);
}

export const formatDoubleLabel = (value, backCaption) => {
    const formatNum = formatDoubleValue(value);
    return formatNum + backCaption;
}

export const formatCoordinateLabel = (coordinate, direction) => {
    const degrees = Math.trunc(Math.abs(coordinate));
    const minutesDouble = (Math.abs(coordinate) - degrees) * 60.0;
    const degreesString = degrees.toString() + '°'
    const minutesString = formatDoubleLabel(minutesDouble, '\'');

    var coordinateString = degreesString + ' ' + minutesString;

    if (direction !== null) {
        if (coordinate < 0) {
            coordinateString += ' ' + direction[2];
        } else {
            coordinateString += ' ' + direction[0];
        }
    }

    return coordinateString;
}

export function formatTimeWithSeconds(timestamp, timezone, showTz = false, useShortTz = false) {
    var date = DateTime.fromSeconds(timestamp).setZone(timezone);
    var dateString = date.toFormat('y-MM-dd HH:mm:ss');
    if (showTz) {
        if (useShortTz) {
            dateString += ' ' + date.offsetNameShort;
        } else {
            dateString += ' ' + date.zoneName;
        }
    }
    return dateString;
}
