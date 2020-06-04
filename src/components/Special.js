import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Error from "./Error";

import "../styles/Special.scss";

import { formatDoubleLabel } from "../Formatters";

let timeCutoff = 72.0;
let timeWaxingCresent = 40.0;
let timeWaningCresent = 48.0;
let timeCowJumping = [2.0, 3.0];
let fullMoonFraction = 0.987;
let noTime = "----";

function checkMoonTime(moonTime, cutoffTime, phaseTime) {
  let timeLabel;
  let indicatorState;
  if (moonTime <= cutoffTime) {
    timeLabel = formatDoubleLabel(moonTime, " hours", 1);
    if (moonTime > phaseTime) {
      indicatorState = 2;
    } else {
      indicatorState = 1;
    }
  } else {
    timeLabel = noTime;
    indicatorState = 0;
  }
  return [timeLabel, indicatorState];
}

function useCheckFullMoonStars(name, indicator) {
  useEffect(() => {
    let starDivs = document.getElementsByClassName(name);
    let isActive;
    if (name.search("near") >= 0) {
      isActive =
        indicator >= timeCowJumping[0] && indicator <= timeCowJumping[1];
    }
    if (name.search("at") >= 0) {
      isActive = indicator >= fullMoonFraction;
    }
    for (var i = 0; i < starDivs.length; i++) {
      var icon = starDivs[i].childNodes[1];
      if (isActive) {
        icon.className.baseVal = icon.className.baseVal.replace(
          "star-inactive",
          "star-active"
        );
      } else {
        icon.className.baseVal = icon.className.baseVal.replace(
          "star-active",
          "star-inactive"
        );
      }
    }
  }, [indicator, name]);
}

function useCheckNewMoonStars(name, indicator) {
  useEffect(() => {
    let starDivs = document.getElementsByClassName(name);
    for (var i = 0; i < starDivs.length; i++) {
      var icon = starDivs[i].childNodes[1];
      if (starDivs[i].id === indicator.toString()) {
        icon.className.baseVal = icon.className.baseVal.replace(
          "star-inactive",
          "star-active"
        );
      } else {
        icon.className.baseVal = icon.className.baseVal.replace(
          "star-active",
          "star-inactive"
        );
      }
    }
  }, [indicator, name]);
}

function Special(props) {
  let hasError = props.error;

  let [timeFromNew, fromNewIndicator] = checkMoonTime(
    props.timeFromNew,
    timeCutoff,
    timeWaxingCresent
  );
  let [timeToNew, toNewIndicator] = checkMoonTime(
    props.timeToNew,
    timeCutoff,
    timeWaningCresent
  );

  useCheckNewMoonStars("from-new", fromNewIndicator);
  useCheckNewMoonStars("to-new", toNewIndicator);
  useCheckFullMoonStars("near-full", props.timeToFull);
  useCheckFullMoonStars("at-full", props.fractionalPhase);

  return (
    <div>
      {!hasError ? (
        <div>
          <h1>Special</h1>
          <div className="info-container">
            <div className="info-row">
              <p>Time from New Moon:</p>
              <p>{timeFromNew}</p>
            </div>
            <div id="1" className="info-row from-new">
              <p>Cresent Moon, Waxing</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <div id="2" className="info-row from-new">
              <p>Old Moon in New Moon's Arms</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <hr />
            <div className="info-row">
              <p>Time to New Moon:</p>
              <p>{timeToNew}</p>
            </div>
            <div id="1" className="info-row to-new">
              <p>Cresent Moon, Waning</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <div id="2" className="info-row to-new">
              <p>New Moon in Old Moon's Arms</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <hr />
            <div className="info-row near-full">
              <p>Cow Jumping over the Moon</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <div className="info-row at-full">
              <p>Woman in the Moon</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <div className="info-row at-full">
              <p>Man in the Moon</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
            <div className="info-row at-full">
              <p>Rabbit in the Moon</p>
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
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

export default Special;
