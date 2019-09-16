import React from "react";

import { Canvas } from "react-three-fiber";

import ErrorBoundary from "./ErrorBoundary";

import Camera from "./phase_view/Camera";
import EarthShine from "./phase_view/EarthShine";
import Moon from "./phase_view/Moon";
import Sun from "./phase_view/Sun";

const maxCameraZoomOut = 75.0;

function MoonPhase(props) {
  return (
    <ErrorBoundary>
      <Canvas
        orthographic={true}
        camera={{
          left: -5,
          right: 5,
          top: 5,
          bottom: -5,
          near: 0.1,
          far: 100,
          position: [0, 0, 5],
          zoom: maxCameraZoomOut
        }}
      >
        {/* <Camera /> */}
        <Sun
          solarElongation={props.solarElongation}
          subSolarLatitude={props.subSolarLatitude}
        />
        <EarthShine />
        <Moon libration={props.libration} />
      </Canvas>
    </ErrorBoundary>
  );
}

export default MoonPhase;
