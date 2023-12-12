import React from 'react';

import { handleOuterDiv } from './HandleOuterDiv';

import '../styles/LoadScreen.scss';

function LoadScreen() {
  handleOuterDiv(0);

  console.log('ZZ');
  return (
    <div className="load-screen">
      <h2>Loading Data .... </h2>
      <div className="outer">
        <p />
      </div>
    </div>
  );
}

export default LoadScreen;
