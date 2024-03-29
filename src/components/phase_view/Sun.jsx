import React, { useEffect, useState } from 'react';

import * as THREE from 'three';

const sunRadius = 5000;
const sunIntensity = 100000000.0;

function Sun(props) {
  let [sunXPosition, setSunXPosition] = useState(0);
  let [sunYPosition, setSunYPosition] = useState(0);
  let [sunZPosition, setSunZPosition] = useState(sunRadius);

  useEffect(() => {
    let phaseAngle = props.solarElongation + 180.0;
    if (phaseAngle > 360.0) {
      phaseAngle -= 360.0;
    }

    let phaseAngleRad = THREE.MathUtils.degToRad(-phaseAngle);
    let subSolarLatRad = THREE.MathUtils.degToRad(props.subSolarLatitude);

    setSunXPosition(sunRadius * Math.sin(phaseAngleRad));
    setSunYPosition(sunRadius * Math.sin(subSolarLatRad));
    setSunZPosition(sunRadius * Math.cos(phaseAngleRad));
  }, [props.solarElongation, props.subSolarLatitude]);

  return <pointLight intensity={sunIntensity} position={[sunXPosition, sunYPosition, sunZPosition]} />;
}

export default Sun;
