import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import '../styles/FeatureDialog.scss';

import { formatDoubleCoordinateLabel, formatDoubleLabel } from '../Formatters';

let domElement = document.getElementById('root');

function FeatureDialog(props) {
  return (
    <div>
      {props.isShowing
        ? ReactDOM.createPortal(
            <div className="modal">
              <div className="content-fd" aria-modal aria-hidden role="dialog" onClick={props.hide}>
                <div className="header info-row">
                  <h1>Feature Information</h1>
                  <button className="close" onClick={props.hide}>
                    <FontAwesomeIcon icon={faWindowClose} />
                  </button>
                </div>
                <div className="info-container">
                  <div className="info-row">
                    <p>Name:</p>
                    <p>{props.feature.name}</p>
                  </div>
                  <div className="info-row">
                    <p>Type:</p>
                    <p>{props.feature.type}</p>
                  </div>
                  <div className="info-row">
                    <p>Latitude:</p>
                    <p>{formatDoubleCoordinateLabel(props.feature.latitude, 'NS')}</p>
                  </div>
                  <div className="info-row">
                    <p>Longitude:</p>
                    <p>{formatDoubleCoordinateLabel(props.feature.longitude, 'EW')}</p>
                  </div>
                  <div className="info-row">
                    <p>Diameter:</p>
                    <p>{formatDoubleLabel(props.feature.diameter, ' km')}</p>
                  </div>
                  <div className="info-row">
                    <p>Quad Name:</p>
                    <p>{props.feature.quadName}</p>
                  </div>
                  <div className="info-row">
                    <p>Quad Code:</p>
                    <p>{props.feature.quadCode}</p>
                  </div>
                </div>
              </div>
            </div>,
            domElement,
          )
        : null}
    </div>
  );
}

export default FeatureDialog;
