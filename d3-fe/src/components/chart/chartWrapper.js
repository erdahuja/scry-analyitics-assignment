import React from "react";

import LineChart from "./chart";
import Loader from "../loader";
import "./chart.css";

export default function ChartWrapper({ setRange, fetchResponse }) {
  const [data, isLoading] = fetchResponse;
  if (isLoading === false && data.length > 0) {
    return (
      <div className="chartContainer">
        <span className="heading">Scry Analytics</span>
        <LineChart data={data} setRange={setRange} />
      </div>
    );
  } else {
    return <Loader />;
  }
}
