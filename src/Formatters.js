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

export const formatTimeOnly = (timeTuple) => {
    const local = DateTime.local(timeTuple[0], timeTuple[1], timeTuple[2],
                                 timeTuple[3], timeTuple[4], timeTuple[5])
    const timeString = local.toFormat('HH:mm');
    return timeString;
}

export const formatRightAscension = (value) => {
    const hoursDecimal = value / 15.0;
    const hours = Math.trunc(hoursDecimal);
    const minutesDecimal = (hoursDecimal - hours) * 60.0;
    const minutes = Math.round(minutesDecimal);

    const hoursString = hours.toString().padStart(2, '0') + 'h';
    const minutesString = minutes.toString().padStart(2, '0') + 'm';
    return hoursString + ' ' + minutesString;
}