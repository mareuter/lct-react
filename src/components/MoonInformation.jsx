import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useGetData from './UseGetData';

import Ephemeris from './Ephemeris';
import NextFourPhases from './NextFourPhases';
import PhaseAndLibration from './PhaseAndLibration';
import SkyPosition from './SkyPosition';

import '../styles/MoonInformation.scss';

import moonInfoJson from '../data/moonInfo.json';

const MOON_INFO_LOCAL = 'moonInfo';

function MoonInformation(props) {
  let moonInfoState = localStorage.getItem(MOON_INFO_LOCAL)
    ? JSON.parse(localStorage.getItem(MOON_INFO_LOCAL))
    : moonInfoJson;
  var [moonInfo, setMoonInfo] = useState(moonInfoState);
  var [error, setError] = useState(false);
  // var moonInfo = useGetData({
  //   url: 'https://lct-web.onrender.com/moon_info',
  //   params: {
  //     date: props.date,
  //     tz: props.timezone,
  //     lat: props.latitude,
  //     lon: props.longitude,
  //   },
  // });
  // if (!moonInfo) {
  //   moonInfo = moonInfoState;
  // } else {
  //   localStorage.setItem(MOON_INFO_LOCAL, JSON.stringify(moonInfo));
  // }

  useEffect(() => {
    const getData = async () => {
      let url = 'https://lct-web.onrender.com/moon_info';
      const params = new URLSearchParams({
        date: props.date,
        tz: props.timezone,
        lat: props.latitude,
        lon: props.longitude,
      });
      try {
        const response = await fetch(`${url}?${params}`);
        if (!response.ok) {
          setError(true);
          // throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result);
        setMoonInfo(result);
        setError(false);
        localStorage.setItem(MOON_INFO_LOCAL, JSON.stringify(result));
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, [props.date, props.timezone, props.latitude, props.longitude]);

  // useEffect(() => {
  //   let axiosCancelSource = axios.CancelToken.source();

  //   const config = {
  //     url: 'https://lct-web.onrender.com/moon_info',
  //     params: {
  //       date: props.date,
  //       tz: props.timezone,
  //       lat: props.latitude,
  //       lon: props.longitude,
  //     },
  //     cancelToken: axiosCancelSource.token,
  //   };
  //   axios(config)
  //     .then((response) => {
  //       setMoonInfo(response.data);
  //       setError(false);
  //       localStorage.setItem(MOON_INFO_LOCAL, JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       if (error.toString() !== 'Cancel') {
  //         setError(true);
  //       }
  //     });
  //   return () => {
  //     axiosCancelSource.cancel();
  //   };
  // }, [props.date, props.timezone, props.latitude, props.longitude]);

  useEffect(() => {
    let divs = document.getElementsByClassName('coord-check');
    for (var i = 0; i < divs.length; i++) {
      if (props.coordinatesGood) {
        divs[i].className = divs[i].className.replace(' bad-coords', '');
      } else {
        divs[i].className += ' bad-coords';
      }
    }
  }, [props.coordinatesGood]);

  useEffect(() => {
    let div = document.getElementsByClassName('outer')[0];
    let divP = div.childNodes[0];
    divP.style = '';
    let viewportBottom = document.documentElement.clientHeight;
    let diff = viewportBottom - div.getBoundingClientRect().top;
    // console.log("B1:", viewportBottom)
    // console.log("B2:", div.getBoundingClientRect().top)
    if (diff < 0) {
      divP.style = 'display: hidden; margin: 0;';
    } else {
      let height = 'height: calc(' + diff.toString() + 'px + 10vw)';
      let str = 'flex-grow: 1; ' + height;
      divP.style = str;
    }
  });

  return (
    <div className="mi-container">
      <div className="mi-item">
        <Ephemeris
          datetime={props.date}
          timezone={props.timezone}
          latitude={props.latitude}
          longitude={props.longitude}
          moonInfo={moonInfo}
          error={error}
        />
      </div>
      <div className="nfp-item">
        <NextFourPhases timezone={props.timezone} moonInfo={moonInfo} error={error} />
      </div>
      <div className="pal-item">
        <PhaseAndLibration moonInfo={moonInfo} error={error} />
      </div>
      <div className="sp-item">
        <SkyPosition moonInfo={moonInfo} error={error} />
      </div>
      <div className="outer">
        <p />
      </div>
    </div>
  );
}

export default MoonInformation;
