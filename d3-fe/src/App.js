import React, { useState } from "react";
import "./App.css";

import Comment from "./components/comment";
import LineChart from "./components/chart";
import CommentListing from "./components/commentlisting";
import useFetch from "./components/fetch";


function App() {
  const [range, setRange] = useState([]);
  const fetchResponse = useFetch("http://localhost:3001/stocks");
  return (
    <div className="container">
      {range.length > 0 && <Comment range={range} setRange={setRange} />}
      {<LineChart setRange={setRange} fetchResponse={fetchResponse} />}
      {fetchResponse[0].length > 0 && <CommentListing />}
    </div>
  );
}

export default App;
