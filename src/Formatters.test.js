import { formatCoordinateLabel, formatDoubleLabel, formatTimeWithSeconds } from './Formatters';

describe('Formatting Double Labels', () => {
    test('Standard Value Label', () => {
        expect(formatDoubleLabel(12.6353, ' days')).toBe('12.64 days');
    });
    
    test('Percent Label', () => {
        expect(formatDoubleLabel(0.4243, '%')).toBe('0.42%');
    });

    test('Integer Label', () => {
        expect(formatDoubleLabel(30, ' hours')).toBe('30.00 hours');
    })
});

describe('Formatting Coordinate Labels', () => {
    test('Positive Coordinate Label', () => {
        expect(formatCoordinateLabel(145.5, 'N S')).toBe('145° 30.00\' N');
    });

    test('Negative Coordinate Label', () => {
        expect(formatCoordinateLabel(-56.7541666, 'E W')).toBe('56° 45.25\' W');
    });

    test('No Direction Coordinate Label', () => {
        expect(formatCoordinateLabel(32.75349234, null)).toBe('32° 45.21\'');
    });
});

// Month is actual - 1
const testDate = new Date(Date.UTC(2019, 5, 8, 3, 30, 0, 743)).getTime() / 1000;
const timezone = 'America/New_York';

describe('Formatting Time Labels', () => {
    test('UTC Time Label', () => {
        expect(formatTimeWithSeconds(testDate, 'UTC')).toBe('2019-06-08 03:30:00');
    });

    test('Local Time Label', () => {
        expect(formatTimeWithSeconds(testDate, timezone)).toBe('2019-06-07 23:30:00')
    });

    test('Local Time with IANA Timezone Label', () => {
        const output = '2019-06-07 23:30:00 ' + timezone 
        expect(formatTimeWithSeconds(testDate, timezone, true)).toBe(output)
    });

    test('Local Time with Short Timezone Label', () => {
        const output = '2019-06-07 23:30:00 EDT' 
        expect(formatTimeWithSeconds(testDate, timezone, true, true)).toBe(output)
    });
});
