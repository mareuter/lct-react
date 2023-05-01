import React, { useEffect, useMemo, useState } from "react";

import * as THREE from "three";

import Moon_map from "../../images/moon_map.png";
import Moon_elevation_map from "../../images/moon_elevation_map.png";

const NUM_MOON_SEGMENTS = 32;
const OFFSET_Y_ROTATION = -THREE.MathUtils.degToRad(90);
const ANISOTROPY_LEVEL = 20;

function Moon(props) {
  let moonMap = useMemo(() => new THREE.TextureLoader().load(Moon_map), []);
  moonMap.anisotropy = ANISOTROPY_LEVEL;

  let moonElevationMap = useMemo(
    () => new THREE.TextureLoader().load(Moon_elevation_map),
    []
  );
  moonElevationMap.anisotropy = ANISOTROPY_LEVEL;

  let [librationLonRad, setLibrationLonRad] = useState(0);
  let [librationLatRad, setLibrationLatRad] = useState(0);

  useEffect(() => {
    setLibrationLonRad(THREE.MathUtils.degToRad(props.libration.lon));
    setLibrationLatRad(THREE.MathUtils.degToRad(props.libration.lat));
  }, [props.libration.lon, props.libration.lat]);

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[librationLatRad, OFFSET_Y_ROTATION - librationLonRad, 0]}
      geometry={
        new THREE.SphereGeometry(
          props.moonRadius,
          NUM_MOON_SEGMENTS,
          NUM_MOON_SEGMENTS
        )
      }
      material={
        new THREE.MeshStandardMaterial({
          map: moonMap,
          bumpMap: moonElevationMap,
          bumpScale: 0.5,
          metalness: 0,
          roughness: 1.0,
        })
      }
    />
  );
}

export default Moon;
