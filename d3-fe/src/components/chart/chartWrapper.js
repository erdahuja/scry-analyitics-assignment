import React, { useState } from "react";

import LineChart from "./chart";
import Loader from "../loader";
import "./chart.css";

export default function ChartWrapper({ setRange, fetchResponse }) {
  const [data, isLoading] = fetchResponse;
  const [brushes, setBrushes] = useState([{ id: 1}]); 
  const updateBrushes = () => setBrushes(brushes => [...brushes, { id: brushes.length +1 }]);
  if (isLoading === false && data.length > 0) {
    return (
      <div className="chartContainer">
        <span className="heading">Scry Analytics</span>
        <LineChart data={data} setRange={setRange} brushes={brushes} setBrushes={updateBrushes}/>
      </div>
    );
  } else {
    return <Loader />;
  }
}
