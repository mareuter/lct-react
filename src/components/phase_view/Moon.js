import React, { useMemo } from "react";

import * as THREE from "three";

import Moon_map from "../../images/Moon_map.png";
import Moon_elevation_map from "../../images/Moon_elevation_map.png";

const numMoonSegments = 32;
const OFFSET_Y_ROTATION = -THREE.Math.degToRad(90);

function Moon(props) {
  let moonMap = useMemo(() => new THREE.TextureLoader().load(Moon_map), []);
  let moonElevationMap = useMemo(() => new THREE.TextureLoader().load(Moon_elevation_map), []);

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[0, OFFSET_Y_ROTATION, 0]}
      geometry={new THREE.SphereGeometry(1, numMoonSegments, numMoonSegments)}
      material={
        new THREE.MeshPhongMaterial({
          map: moonMap,
          bumpMap: moonElevationMap,
          bumpScale: 0.05,
          shininess: 0,
        })
      }
    />
  );
}

export default Moon;
