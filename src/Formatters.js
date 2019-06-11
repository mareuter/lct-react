function formatDoubleValue(value) {
    const decimalPlaces = 2;
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces);
}

function formatDoubleLabel(value, backCaption) {
    const formatNum = formatDoubleValue(value);
    return formatNum + backCaption;
}

function formatCoordinateLabel(coordinate, direction) {
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

module.exports = {
    formatCoordinateLabel,
    formatDoubleLabel
}