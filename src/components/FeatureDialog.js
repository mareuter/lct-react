import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import "../styles/FeatureDialog.scss";

import { formatDoubleCoordinateLabel, formatDoubleLabel } from "../Formatters";

let domElement = document.getElementById("root");

function FeatureDialog(props) {
  return (
    <div>
      {props.isShowing
        ? ReactDOM.createPortal(
            <div className="modal">
              <div
                className="w3-container content"
                aria-modal
                aria-hidden
                role="dialog"
                onClick={props.hide}
              >
                <div className="header">
                  <button className="close w3-right" onClick={props.hide}>
                    <FontAwesomeIcon icon={faWindowClose} />
                  </button>
                  <h1>Feature Information</h1>
                </div>
                <div className="w3-container">
                  <div className="w3-row">
                    <div className="w3-col s4">
                      <p>Name:</p>
                    </div>
                    <div className="w3-col s8 w3-right-align">
                      <p>{props.feature.name}</p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Type:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>{props.feature.type}</p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Latitude:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>
                        {formatDoubleCoordinateLabel(
                          props.feature.latitude,
                          "NS"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Longitude:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>
                        {formatDoubleCoordinateLabel(
                          props.feature.longitude,
                          "EW"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Diameter:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>{formatDoubleLabel(props.feature.diameter, " km")}</p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Quad Name:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>{props.feature.quadName}</p>
                    </div>
                  </div>
                  <div className="w3-row">
                    <div className="w3-col s6">
                      <p>Quad Code:</p>
                    </div>
                    <div className="w3-col s6 w3-right-align">
                      <p>{props.feature.quadCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            domElement
          )
        : null}
    </div>
  );
}

export default FeatureDialog;
