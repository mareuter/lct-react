import React, { useEffect, useRef, useState } from "react";

import { useThree } from "react-three-fiber";

const POSITION = [0, 0, 250];
const BOX = 200;
const BASE_ZOOM = 0.836;

function Camera(props) {
  let camera = useRef();
  let { setDefaultCamera } = useThree();
  let [aspect, setAspect] = useState(1);
  let [maxCameraZoomOut, setMaxCameraZoomOut] = useState(BASE_ZOOM);

  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  useEffect(() => {
    let div = document.getElementsByClassName("canvas")[0];
    setAspect(div.clientWidth / div.clientHeight);
    setMaxCameraZoomOut(BASE_ZOOM * Math.min(div.clientHeight, div.clientWidth) / BOX);
    camera.current.updateProjectionMatrix();
  }, [aspect]);

  return (
    <orthographicCamera
      ref={camera}
      position={POSITION}
      left={-BOX}
      right={BOX}
      top={BOX}
      bottom={BOX}
      near={0.1}
      far={1000}
      aspect={aspect}
      zoom={maxCameraZoomOut}
      {...props}
    />
  );
}

export default Camera;
