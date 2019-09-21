import React, { useEffect, useState } from "react";

import * as THREE from "three";

const ARROW_RADIUS_OFFSET = 1.12;
const SEGMENTS = 32;
const CYLINDER_RADIUS = 1.5;
const CYLINDER_HEIGHT = 12;
const CONE_RADIUS = 3 * CYLINDER_RADIUS;
const CONE_HEIGHT = 7;
const COLOR = 0x00ffff;
const ARROW_MATERIAL = { color: COLOR };

function LibrationArrow(props) {
  let [originXPosition, setOriginXPosition] = useState(0);
  let [originYPosition, setOriginYPosition] = useState(0);
  let [originZRotation, setOriginZRotation] = useState(0);

  useEffect(() => {
    let arrowRadius = props.moonRadius * ARROW_RADIUS_OFFSET;

    let librationLonRad = THREE.Math.degToRad(props.libration.lon);
    let librationLatRad = THREE.Math.degToRad(props.libration.lat);
    let librationPhaseAngRad = Math.atan2(librationLatRad, librationLonRad);

    setOriginXPosition(arrowRadius * Math.cos(librationPhaseAngRad));
    setOriginYPosition(arrowRadius * Math.sin(librationPhaseAngRad));
    setOriginZRotation(THREE.Math.degToRad(90) + librationPhaseAngRad);
  }, [props.libration.lon, props.libration.lat, props.moonRadius]);

  return (
    <group
      position={[originXPosition, originYPosition, 0]}
      rotation={[0, 0, originZRotation]}
    >
      <mesh
        visible
        position={[0, CYLINDER_HEIGHT / 2, 0]}
        geometry={new THREE.ConeGeometry(CONE_RADIUS, CONE_HEIGHT, SEGMENTS)}
        material={new THREE.MeshBasicMaterial(ARROW_MATERIAL)}
      />
      <mesh
        visible
        position={[0, 0, 0]}
        geometry={
          new THREE.CylinderGeometry(
            CYLINDER_RADIUS,
            CYLINDER_RADIUS,
            CYLINDER_HEIGHT,
            SEGMENTS
          )
        }
        material={new THREE.MeshBasicMaterial(ARROW_MATERIAL)}
      />
    </group>
  );
}

export default LibrationArrow;
