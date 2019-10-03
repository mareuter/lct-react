import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/LunarClub.scss";

import FeatureList from "./FeatureList";
import Special from "./Special";

import lunarClubInfoJson from "../data/lunarClubInfo.json";

const LUNAR_CLUB_INFO_LOCAL = "lunarClubInfo";

function LunarClub(props) {
  let lunarClubInfoState = localStorage.getItem(LUNAR_CLUB_INFO_LOCAL)
    ? JSON.parse(localStorage.getItem(LUNAR_CLUB_INFO_LOCAL))
    : lunarClubInfoJson;
  const [lunarClubInfo, setLunarClubInfo] = useState(lunarClubInfoState);
  const [error, setError] = useState(false);

  useEffect(() => {
    let axiosCancelSource = axios.CancelToken.source();

    const config = {
      url: "https://lct-web-stage.herokuapp.com/lunar_club",
      params: {
        date: props.date,
        lat: props.latitude,
        lon: props.longitude
      },
      cancelToken: axiosCancelSource.token
    };
    axios(config)
      .then(response => {
        setLunarClubInfo(response.data);
        setError(false);
        localStorage.setItem(
          LUNAR_CLUB_INFO_LOCAL,
          JSON.stringify(response.data)
        );
      })
      .catch(error => {
        if (error.toString() !== "Cancel") {
          setError(true);
        }
      });
    return () => {
      axiosCancelSource.cancel();
    };
  }, [props.date, props.latitude, props.longitude]);

  return (
    <div className="lc-container">
      <div className="special-item">
        <Special
          timeFromNew={lunarClubInfo.time_from_new_moon}
          timeToNew={lunarClubInfo.time_to_new_moon}
          timeToFull={lunarClubInfo.time_to_full_moon}
          fractionalPhase={lunarClubInfo.fractional_phase}
          error={error}
        />
      </div>
      <div className="ne-item">
        <FeatureList
          title={"Naked Eye"}
          features={lunarClubInfo.naked_eye_features}
          error={error}
        />
      </div>
      <div className="bino-item">
        <FeatureList
          title={"Binocular"}
          features={lunarClubInfo.binocular_features}
          error={error}
        />
      </div>
      <div className="tele-item">
        <FeatureList
          title={"Telescope"}
          features={lunarClubInfo.telescope_features}
          error={error}
        />
      </div>
      <div className="outer">
        <p />
      </div>
    </div>
  );
}

export default LunarClub;
