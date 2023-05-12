import React from 'react';

import '../styles/Welcome.scss';

import launcher_screen from '../images/launcher_screen.png';

function Welcome() {
  return (
    <div className="w3-center">
      <img className="home-screen" src={launcher_screen} alt="Lunar Club Tools" />
    </div>
  );
}

export default Welcome;
