import * as d3 from "d3";

export default function initialize_containers(cgm) {
  var base_container = cgm.args.container;
  // make control panel (needs to appear above canvas)
  d3.select(base_container)
    .append("div")
    .attr("class", "control-container")
    .style("cursor", "default");
  // make canvas container
  d3.select(base_container)
    .append("div")
    .attr("class", "canvas-container")
    .style("position", "relative")
    .style("margin-right", "-25px")
    .style("margin-bottom", "-25px")
    .style("cursor", "default");
  var canvas_container = d3.select(base_container).select(".canvas-container")
    ._groups[0][0];
  var inst_height = cgm.args.viz_height;
  var inst_width = cgm.args.viz_width;
  d3.select(canvas_container)
    .style("height", inst_height)
    .style("width", inst_width);

  return canvas_container;
}
