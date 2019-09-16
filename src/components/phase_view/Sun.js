import React from "react";

const sunRadius = 1000;

function Sun(props) {
  return <pointLight intensity={2.5} position={[0, 0, sunRadius]} />;
}

export default Sun;
