import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";
import "./DateTimeChangeDialog.css";

let domElement = document.getElementById("root");

function DateTimeChangeDialog(props) {
  let [newDate, setNewDate] = useState(new Date());

  function onChange(value) {
    setNewDate(value);
  }

  function updateContext(event) {
      props.hide();
  }

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
              >
                <div className="header">
                  <button className="close w3-right" onClick={props.hide}>
                    <FontAwesomeIcon icon={faWindowClose} />
                  </button>
                  <h1>Change Date/Time</h1>
                </div>
                <div className="w3-row">
                  <div className="w3-col w3-center s8">
                    <DatePicker
                      selected={newDate}
                      onChange={onChange}
                      todayButton="Today"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="Time"
                      dateFormat="MM/dd/yyyy HH:mm"
                    />
                  </div>
                  <div className="w3-col w3-center s4">
                    <button className="update-button" onClick={updateContext}>
                      Update
                    </button>
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

export default DateTimeChangeDialog;
