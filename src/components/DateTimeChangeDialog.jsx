import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { useDateValue } from '../DateContext';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DateTimeChangeDialog.scss';

let domElement = document.getElementById('root');

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
              <div className="content-dt" aria-modal aria-hidden role="dialog">
                <div className="header info-row">
                  <h1>Change Date/Time</h1>
                  <button className="close" onClick={props.hide}>
                    <FontAwesomeIcon icon={faWindowClose} />
                  </button>
                </div>
                <div className="widget-dt">
                  <button className="update-button" onClick={changeDate}>
                    Update
                  </button>
                  <DatePicker
                    selected={newDate}
                    onChange={onChange}
                    todayButton="Today"
                    showTimeInput
                    inline
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="yyyy/MM/dd HH:mm"
                  />
                </div>
              </div>
            </div>,
            domElement,
          )
        : null}
    </div>
  );
}

export default DateTimeChangeDialog;
