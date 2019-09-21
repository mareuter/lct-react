import React from "react";

import { Canvas } from "react-three-fiber";

import ErrorBoundary from "./ErrorBoundary";

import Camera from "./phase_view/Camera";
import EarthShine from "./phase_view/EarthShine";
import LibrationArrow from "./phase_view/LibrationArrow";
import Moon from "./phase_view/Moon";
import Sun from "./phase_view/Sun";

const moonRadius = 100;

function MoonPhase(props) {
  return (
    <ErrorBoundary>
      <Canvas invalidateFrameloop={true}>
        <Camera />
        <Sun
          solarElongation={props.solarElongation}
          subSolarLatitude={props.subSolarLatitude}
        />
        <EarthShine />
        <Moon moonRadius={moonRadius} libration={props.libration} />
        <LibrationArrow moonRadius={moonRadius} libration={props.libration} />
      </Canvas>
    </ErrorBoundary>
  );
}

export default MoonPhase;
