import React, { useEffect, useRef } from "react";

import { useThree } from "react-three-fiber";

const POSITION = [0, 0, 10];
const FOV = 5;

function Camera(props) {
  const camera = useRef();
  const { setDefaultCamera } = useThree();

  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  return <perspectiveCamera camera={camera} position={POSITION} FOV={FOV} isOrthographic={true} {...props} />;
}

export default Camera;
