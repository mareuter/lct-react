import React, { useEffect, useState } from "react";
import axios from "axios";

import FeatureList from "./FeatureList";

import lunarClubInfoJson from "../data/lunarClubInfo.json";

function LunarClub(props) {
  const [lunarClubInfo, setLunarClubInfo] = useState(lunarClubInfoJson);
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
      cancelToken: axiosCancelSource.token,
    };
    axios(config)
      .then(response => {
        setLunarClubInfo(response.data);
        setError(false);
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
        title={"Naked Eye"}
        features={lunarClubInfo.naked_eye_features}
        error={error}
      />
      <FeatureList
        title={"Binocular"}
        features={lunarClubInfo.binocular_features}
        error={error}
      />
      <FeatureList
        title={"Telescope"}
        features={lunarClubInfo.telescope_features}
        error={error}
      />
    </div>
  );
}

export default LunarClub;
