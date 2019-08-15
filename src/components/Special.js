import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Error from "./Error";

import "./Special.css";

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
        timeLabel = formatDoubleLabel(moonTime, " hours");
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
};

function useCheckFullMoonStars(name, indicator) {
    useEffect(() => {
        let starDivs = document.getElementsByClassName(name);
        let isActive;
        if (name.search('near') >= 0) {
            isActive = (indicator >= timeCowJumping[0] && indicator <= timeCowJumping[1]);
        }
        if (name.search('at') >= 0) {
            isActive = (indicator >= fullMoonFraction);
        }
        for (var i = 0; i < starDivs.length; i++) {
            var icon = starDivs[i].childNodes[0];
            if (isActive) {
                icon.className.baseVal = icon.className.baseVal.replace("star-inactive", "star-active");
            } else {
                icon.className.baseVal = icon.className.baseVal.replace("star-active", "star-inactive");
            }
        }
    }, [indicator, name]);
}

function useCheckNewMoonStars(name, indicator) {
    useEffect(() => {
        let starDivs = document.getElementsByClassName(name);
        for (var i = 0; i < starDivs.length; i++) {
            var icon = starDivs[i].childNodes[0];
            if (starDivs[i].id === indicator.toString()) {
                icon.className.baseVal = icon.className.baseVal.replace("star-inactive", "star-active");
            } else {
                icon.className.baseVal = icon.className.baseVal.replace("star-active", "star-inactive");
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
        <div className="w3-container">
          <div className="w3-row w3-center">
            <h1>Special</h1>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Time from New Moon:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{timeFromNew}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Cresent Moon, Waxing</p>
            </div>
            <div id="1" className="w3-half w3-right-align from-new">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Old Moon in New Moon's Arms</p>
            </div>
            <div id="2" className="w3-half w3-right-align from-new">
              <FontAwesomeIcon icon={faStar} className="star-inactive"/>
            </div>
          </div>
          <hr />
          <div className="w3-row">
            <div className="w3-half">
              <p>Time to New Moon:</p>
            </div>
            <div className="w3-half w3-right-align">
              <p>{timeToNew}</p>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Cresent Moon, Waning</p>
            </div>
            <div id="1" className="w3-half w3-right-align to-new">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>New Moon in Old Moon's Arms</p>
            </div>
            <div id="2" className="w3-half w3-right-align to-new">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <hr />
          <div className="w3-row">
            <div className="w3-half">
              <p>Cow Jumping over the Moon</p>
            </div>
            <div className="w3-half w3-right-align near-full">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Woman in the Moon</p>
            </div>
            <div className="w3-half w3-right-align at-full">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Man in the Moon</p>
            </div>
            <div className="w3-half w3-right-align at-full">
              <FontAwesomeIcon icon={faStar} className="star-inactive" />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-half">
              <p>Rabbit in the Moon</p>
            </div>
            <div className="w3-half w3-right-align at-full">
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