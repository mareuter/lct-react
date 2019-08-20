import jstz from "jstz";

import {getAverageTimezoneCoordinates} from "./AverageTimezoneCoordinates";

describe("Retreiving Lat/Long by Timezone Name", () => {
    test("String Access", () => {
        let coordinates = getAverageTimezoneCoordinates("America/Phoenix");
        expect(coordinates).toEqual([35.4744606301, -111.481638946]);
    });
});