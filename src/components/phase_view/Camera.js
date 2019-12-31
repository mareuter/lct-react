import React, { useCallback, useEffect, useRef, useState } from "react";

import { useThree } from "react-three-fiber";

const POSITION = [0, 0, 250];
const BOX = 200;
const BASE_ZOOM = 0.8;
const HEIGHT_PERCENT_CHANGE = 10;

function Camera(props) {
  let camera = useRef();
  let { setDefaultCamera } = useThree();
  let [aspect, setAspect] = useState(1);
  let [maxCameraZoomOut, setMaxCameraZoomOut] = useState(BASE_ZOOM);
  let [currentHeight, setCurrentHeight] = useState(0);

  const resizeCallback = useCallback(() => {
    let div = document.getElementsByClassName("canvas")[0];
    let percentHeightChange =
      100 * (Math.abs(currentHeight - div.clientHeight) /
      (currentHeight + div.clientHeight));
    if (percentHeightChange > HEIGHT_PERCENT_CHANGE) {
      setAspect(div.clientWidth / div.clientHeight);
      setMaxCameraZoomOut(
        (BASE_ZOOM * Math.min(div.clientHeight, div.clientWidth)) / BOX
      );
      camera.current.updateProjectionMatrix();
      setCurrentHeight(div.clientHeight);
    }
  }, [currentHeight]);

  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  useEffect(() => {
    resizeCallback();
    window.addEventListener("resize", resizeCallback);
    return () => window.removeEventListener("resize", resizeCallback);
  }, [resizeCallback]);

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
