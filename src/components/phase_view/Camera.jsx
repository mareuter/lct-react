import React, { useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

const POSITION = [0, 0, 250];
const BOX = 200;
const BASE_ZOOM = 0.8;
const HEIGHT_PERCENT_CHANGE = 10;

function Camera(props) {
  const canvasSize = useThree((state) => state.size);
  let [maxCameraZoomOut, setMaxCameraZoomOut] = useState(BASE_ZOOM);
  let [currentHeight, setCurrentHeight] = useState(0);

  useFrame(() => {
    let percentHeightChange =
      100 *
      (Math.abs(currentHeight - canvasSize.height) /
        (currentHeight + canvasSize.height));
    if (percentHeightChange > HEIGHT_PERCENT_CHANGE) {
      setMaxCameraZoomOut(
        (BASE_ZOOM * Math.min(canvasSize.height, canvasSize.width)) / BOX
      );
      setCurrentHeight(canvasSize.height);
    }
  });

  return (
    <OrthographicCamera
      makeDefault
      position={POSITION}
      zoom={maxCameraZoomOut}
    />
  );
}
export default Camera;
