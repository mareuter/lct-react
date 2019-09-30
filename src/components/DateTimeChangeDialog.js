import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useDateValue } from "../DateContext";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/Modal.scss";
import "../styles/DateTimeChangeDialog.scss";

let domElement = document.getElementById("root");

function DateTimeChangeDialog(props) {
  let { date, setDate } = useDateValue();
  let [newDate, setNewDate] = useState(date);

  function onChange(value) {
    setNewDate(value);
  }

  function changeDate() {
    setDate(newDate);
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
                  <h1 className="w3-center">Change Date/Time</h1>
                </div>
                <div className="w3-center">
                  <div className="button-div">
                    <button className="update-button" onClick={changeDate}>
                      Update
                    </button>
                  </div>
                  <DatePicker
                    selected={newDate}
                    onChange={onChange}
                    todayButton="Today"
                    showTimeInput
                    inline
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="MM/dd/yyyy HH:mm"
                  />
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
