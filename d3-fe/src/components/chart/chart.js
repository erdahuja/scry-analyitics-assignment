import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 750;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 55 };
const blue = '#4FC4F6';

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
    brushRef = React.createRef();

    xAxis = d3.axisBottom().scale(this.state.xScale)
        .tickFormat(d3.timeFormat('%b %Y'));
    yAxis = d3.axisLeft().scale(this.state.yScale)
        .tickFormat(d => `$${d}`);
    brush = d3
        .brushX()
        .extent([
            [margin.left, margin.top],
            [width - margin.right, height - margin.bottom]
        ])
        .on("end", () => {
            if (!d3.event.selection) {
                this.props.setRange([]);
                return;
              }
              const [x1, x2] = d3.event.selection;
              const range = [this.state.xScale.invert(x1), this.state.xScale.invert(x2)];
          
              this.props.setRange(range); 
        });

    componentDidMount() {
        d3.select(this.xAxisRef.current).call(this.xAxis);
        d3.select(this.yAxisRef.current).call(this.yAxis);
        d3.select(this.brushRef.current).call(this.brush);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
        const { data } = nextProps;
        const { xScale, yScale, lineGenerator } = prevState;
        // data has changed, so recalculate scale domains
        const timeDomain = d3.extent(data, d => new Date(d.Date));
        const closeStockMax = d3.extent(data, d => d.Close);
        xScale.domain(timeDomain);
        yScale.domain(closeStockMax);

        // calculate line for stockLows
        lineGenerator.x(d => xScale(new Date(d.Date)));
        lineGenerator.y(d => yScale(d.Close));
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
                <path d={this.state.stockLows} fill='none' stroke={blue} strokeWidth='2' />
                <g>
                    <g ref={this.xAxisRef} transform={`translate(0, ${height - margin.bottom})`} />
                    <g ref={this.yAxisRef} transform={`translate(${margin.left}, 0)`} />
                    <g ref={this.brushRef} />
                </g>
            </svg>
        );
    }
}

export default LineChart;
