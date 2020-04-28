import React, { Component } from "react";
import * as d3 from "d3";
import Brush from "./brush";

const width = 750;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 55 };
const blue = "#4FC4F6";

class LineChart extends Component {
  state = {
    stockLows: null,
    // d3 helpers
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line(),
  };

  xAxisRef = React.createRef();
  yAxisRef = React.createRef();

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .tickFormat(d3.timeFormat("%b %Y"));
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .tickFormat((d) => `$${d}`);

  componentDidMount() {
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const { data } = nextProps;
    const { xScale, yScale, lineGenerator } = prevState;
    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(data, (d) => new Date(d.Date));
    const closeStockMax = d3.extent(data, (d) => d.Close);
    xScale.domain(timeDomain);
    yScale.domain(closeStockMax);

    // calculate line for stockLows
    lineGenerator.x((d) => xScale(new Date(d.Date)));
    lineGenerator.y((d) => yScale(d.Close));
    const stockLows = lineGenerator(data);

    return { stockLows };
  }

  componentDidUpdate() {
    d3.select(this.xAxisRef.current).call(this.xAxis);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  render() {
    return (
      <svg width={width} height={height}>
        <path
          d={this.state.stockLows}
          fill="none"
          stroke={blue}
          strokeWidth="2"
        />
        <g>
          <g
            ref={this.xAxisRef}
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref={this.yAxisRef} transform={`translate(${margin.left}, 0)`} />
          {this.props.brushes.map((brush) => {
              const lastBrushID = this.props.brushes[this.props.brushes.length - 1].id;
              return (
            <Brush key={brush.id} brush={brush} lastBrushID={lastBrushID} xScale={this.state.xScale} setBrushes={this.props.setBrushes} setRange={this.props.setRange} />
          )})}
        </g>
      </svg>
    );
  }
}

export default LineChart;
