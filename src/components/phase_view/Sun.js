import React from "react";

import * as THREE from "three";

const sunRadius = 1000;

function Sun(props) {
  let phaseAngle = props.solarElongation + 180.0;
  if (phaseAngle > 360.0) {
    phaseAngle -= 360.0;
  }

  let phaseAngleRad = THREE.Math.degToRad(-phaseAngle);
  let subSolarLatRad = THREE.Math.degToRad(props.subSolarLatitude);

  let sunXPosition = sunRadius * Math.sin(phaseAngleRad);
  let sunYPosition = sunRadius * Math.sin(subSolarLatRad);
  let sunZPosition = sunRadius * Math.cos(phaseAngleRad);

  return (
    <pointLight
      intensity={2.5}
      position={[sunXPosition, sunYPosition, sunZPosition]}
    />
  );
}

export default Sun;
