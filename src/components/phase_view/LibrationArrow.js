import React from "react";

import * as THREE from "three";

const ARROW_RADIUS_OFFSET = 0.1;
const SEGMENTS = 32;
const CYLINDER_RADIUS = 0.01;
const CYLINDER_HEIGHT = 0.1;
const CONE_RADIUS = 3 * CYLINDER_RADIUS;
const CONE_HEIGHT = 0.05;
const COLOR = 0x00ffff;
const ARROW_MATERIAL = { color: COLOR };

function LibrationArrow(props) {
  let arrowRadius = props.moonRadius + ARROW_RADIUS_OFFSET;

  let librationLonRad = THREE.Math.degToRad(props.libration.lon);
  let librationLatRad = THREE.Math.degToRad(props.libration.lat);
  let librationPhaseAngRad = Math.atan2(librationLatRad, librationLonRad);

  let originXPosition = arrowRadius * Math.cos(librationPhaseAngRad);
  let originYPosition = arrowRadius * Math.sin(librationPhaseAngRad);
  let originZRotation = THREE.Math.degToRad(90) + librationPhaseAngRad;

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
