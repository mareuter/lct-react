import React, { useEffect } from 'react';

import Error from './Error';
import { formatTimeWithMinutes } from '../Formatters';

import '../styles/NextFourPhases.scss';

import phase_placeholder from '../images/phase_placeholder.png';
import first_quarter from '../images/first_quarter.png';
import full_moon from '../images/full_moon.png';
import new_moon from '../images/new_moon.png';
import third_quarter from '../images/third_quarter.png';

const moonPhaseIcons = {
  new_moon: new_moon,
  first_quarter: first_quarter,
  full_moon: full_moon,
  last_quarter: third_quarter,
};

function NextFourPhases(props) {
  const hasError = props.error;
  const emptyTime = '0000-00-00 00:00 UTC';

  useEffect(() => {
    var nextFourPhases = [];
    for (var key in props.moonInfo.next_four_phases) {
      const value = props.moonInfo.next_four_phases[key];
      const phase = value['phase'];
      const formattedDateTime = formatTimeWithMinutes(value['datetime'], props.timezone, true);
      nextFourPhases.push([phase, formattedDateTime]);
    }

    if (nextFourPhases.length) {
      var phaseSpans = document.getElementsByClassName('phase');
      nextFourPhases.forEach((value, index) => {
        if (phaseSpans[index].id === index.toString()) {
          var image = phaseSpans[index].childNodes[0];
          var dateTime = phaseSpans[index].childNodes[1];
          image.src = moonPhaseIcons[value[0]];
          image.alt = value[0];
          dateTime.innerHTML = value[1];
        }
      });
    }
  });

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>Next Four Phases</h1>
          <div className="info-container">
            <div id="0" className="phase">
              <img className="phase-image" src={phase_placeholder} alt="placeholder" />
              <p>{emptyTime}</p>
            </div>
            <div id="1" className="phase">
              <img className="phase-image" src={phase_placeholder} alt="placeholder" />
              <p>{emptyTime}</p>
            </div>
            <div id="2" className="phase">
              <img className="phase-image" src={phase_placeholder} alt="placeholder" />
              <p>{emptyTime}</p>
            </div>
            <div id="3" className="phase">
              <img className="phase-image" src={phase_placeholder} alt="placeholder" />
              <p>{emptyTime}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Error />
        </div>
      )}
    </div>
  );
}

export default NextFourPhases;
