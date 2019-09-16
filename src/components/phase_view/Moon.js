import React, { useEffect, useMemo, useState } from "react";

import * as THREE from "three";

import Moon_map from "../../images/Moon_map.png";
import Moon_elevation_map from "../../images/Moon_elevation_map.png";

const numMoonSegments = 32;
const OFFSET_Y_ROTATION = -THREE.Math.degToRad(90);

function Moon(props) {
  let moonMap = useMemo(() => new THREE.TextureLoader().load(Moon_map), []);
  let moonElevationMap = useMemo(
    () => new THREE.TextureLoader().load(Moon_elevation_map),
    []
  );
  let [librationLonRad, setLibrationLonRad] = useState(0);
  let [librationLatRad, setLibrationLatRad] = useState(0);

  useEffect(() => {
    setLibrationLonRad(THREE.Math.degToRad(props.libration.lon));
    setLibrationLatRad(THREE.Math.degToRad(props.libration.lat));
  }, [props.libration.lon, props.libration.lat]);

  return (
    <mesh
      visible
      position={[0, 0, 0]}
      rotation={[librationLatRad, OFFSET_Y_ROTATION - librationLonRad, 0]}
      geometry={
        new THREE.SphereGeometry(
          props.moonRadius,
          numMoonSegments,
          numMoonSegments
        )
      }
      material={
        new THREE.MeshPhongMaterial({
          map: moonMap,
          bumpMap: moonElevationMap,
          bumpScale: 0.05,
          shininess: 0
        })
      }
    />
  );
}

export default Moon;
