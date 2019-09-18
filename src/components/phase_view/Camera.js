import React, { useEffect, useRef, useState } from "react";

import { useThree } from "react-three-fiber";

const POSITION = [0, 0, 250];
const BOX = 50;

function Camera(props) {
  let camera = useRef();
  let { setDefaultCamera } = useThree();
  let [aspect, setAspect] = useState(1);
  let [maxCameraZoomOut, setMaxCameraZoomOut] = useState(1.3);

  useEffect(() => void setDefaultCamera(camera.current), [setDefaultCamera]);

  useEffect(() => {
    let div = document.getElementsByClassName("canvas")[0];
    console.log(div.clientHeight, div.clientWidth);
    let canvas = div.childNodes[0];
    console.log(canvas.clientHeight, canvas.clientWidth);
    setAspect(div.clientWidth / div.clientHeight);
    camera.current.updateProjectionMatrix();
  }, []);

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
