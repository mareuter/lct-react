import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/LunarIIClub.scss";

import FeatureList from "./FeatureList";

import lunarTwoInfoJson from "../data/lunarTwoInfo.json";

const LUNAR_TWO_INFO_LOCAL = "lunarClubInfo";

function LunarIIClub(props) {
  let lunarTwoInfoState = localStorage.getItem(LUNAR_TWO_INFO_LOCAL)
    ? JSON.parse(localStorage.getItem(LUNAR_TWO_INFO_LOCAL))
    : lunarTwoInfoJson;
  const [lunarIIClubInfo, setLunarIIClubInfo] = useState(lunarTwoInfoState);
  const [error, setError] = useState(false);

  useEffect(() => {
    let axiosCancelSource = axios.CancelToken.source();

    const config = {
      url: "https://lct-web.onrender.com/lunar_two",
      params: {
        date: props.date,
        lat: props.latitude,
        lon: props.longitude,
      },
      cancelToken: axiosCancelSource.token,
    };
    axios(config)
      .then((response) => {
        setLunarIIClubInfo(response.data);
        setError(false);
        localStorage.setItem(
          LUNAR_TWO_INFO_LOCAL,
          JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        if (error.toString() !== "Cancel") {
          setError(true);
        }
      });
    return () => {
      axiosCancelSource.cancel();
    };
  }, [props.date, props.latitude, props.longitude]);

  useEffect(() => {
    let div = document.getElementsByClassName("outer")[0];
    let divP = div.childNodes[0];
    divP.style = "";
    let viewportBottom = document.documentElement.clientHeight;
    let diff = viewportBottom - div.getBoundingClientRect().top;
    // console.log("B1:", viewportBottom)
    // console.log("B2:", div.getBoundingClientRect().top)
    if (diff < 0) {
      divP.style = "display: hidden; margin: 0;";
    } else {
      let height = "height: calc(" + diff.toString() + "px + 10vw)";
      let str = "flex-grow: 1; " + height;
      divP.style = str;
    }
  });

  return (
    <div className="lc2-container">
      <div className="features-item">
        <FeatureList
          title={"Features"}
          features={lunarIIClubInfo.features}
          error={error}
        />
      </div>
      <div className="landing-item">
        <FeatureList
          title={"Landing Sites"}
          features={lunarIIClubInfo.landing_sites}
          error={error}
        />
      </div>
      <div className="outer">
        <p />
      </div>
    </div>
  );
}

export default LunarIIClub;
