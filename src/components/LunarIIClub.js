import React, { useEffect, useState } from "react";
import axios from "axios";

import FeatureList from "./FeatureList";

import lunarTwoInfoJson from "../data/lunarTwoInfo.json";

const LUNAR_TWO_INFO_LOCAL = "lunarClubInfo";

function LunarIIClub(props) {
  let lunarTwoInfoState = localStorage.getItem(LUNAR_TWO_INFO_LOCAL) ? JSON.parse(localStorage.getItem(LUNAR_TWO_INFO_LOCAL)) : lunarTwoInfoJson;
  const [lunarIIClubInfo, setLunarIIClubInfo] = useState(lunarTwoInfoState);
  const [error, setError] = useState(false);

  useEffect(() => {
    let axiosCancelSource = axios.CancelToken.source();

    const config = {
      url: "https://lct-web-stage.herokuapp.com/lunar_two",
      params: {
        date: props.date,
        lat: props.latitude,
        lon: props.longitude
      },
      cancelToken: axiosCancelSource.token
    };
    axios(config)
      .then(response => {
        setLunarIIClubInfo(response.data);
        setError(false);
        localStorage.setItem(LUNAR_TWO_INFO_LOCAL, JSON.stringify(response.data));
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
    <div className="w3-container">
      <FeatureList
        title={"Features"}
        features={lunarIIClubInfo.features}
        error={error}
      />
      <FeatureList
        title={"Landing Sites"}
        features={lunarIIClubInfo.landing_sites}
        error={error}
      />
    </div>
  );
}

export default LunarIIClub;
