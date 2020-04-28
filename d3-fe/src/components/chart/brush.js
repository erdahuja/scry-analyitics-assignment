import React from 'react'
import * as d3 from "d3";

const width = 750;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 55 };

export default class Brush extends React.Component {
    
    brushRef = React.createRef();
    brush = d3
    .brushX()
    .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom]
    ])
    .on("end", () => {
        const lastBrushID = this.props.lastBrushID;
        const lastBrush = document.getElementById("brush-" + lastBrushID);
        const selection = d3.brushSelection(lastBrush);
        if (selection && selection[0] !== selection[1]) {
          this.props.setBrushes();
        }
        if (!d3.event.selection) {
            this.props.setRange([]);
            return;
          }
          const [x1, x2] = d3.event.selection;
          const range = [
            this.props.xScale.invert(x1),
            this.props.xScale.invert(x2),
          ];
  
          this.props.setRange(range);
    });

    componentDidMount() {
        d3.select(this.brushRef.current).call(this.brush);
    }
    
    render() {
        const { brush } = this.props;
        return (
            <g ref={this.brushRef} id={"brush-"+brush.id} />
        );
    }
}
