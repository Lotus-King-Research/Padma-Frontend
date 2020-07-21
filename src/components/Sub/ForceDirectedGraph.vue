<template>
  <div class="force-directed-graph" ref="graph">
    <svg
      id="svg"
      pointer-events="all"
      :viewBox="`0 0 ${graphWidth} ${graphHeight}`"
      preserveAspectRatio="xMinYMin meet"
    ></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "forcedirectedgraph",

  components: {},

  props: {
    graphData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      graphWidth: 0,
      graphHeight: 0,
      padding: 5,
      radius: d => {
        return +d.degree * 20;
      },
      force: null
    };
  },

  watch: {
    graphData: {
      immediate: true,
      handler(newVal) {
        this.renderGraph(newVal);
      }
    }
  },

  mounted() {
    this.graphWidth = window.innerWidth - 30;
    this.graphHeight = window.innerHeight - 100;

    this.force = d3
      .forceSimulation()
      // Create a force between nodes based on links
      .force(
        "link",
        d3.forceLink().id(d => {
          return d.id;
        })
      )
      // forceManyBody simulates attraction and repulsion between nodes based on edge weight
      .force("charge", d3.forceManyBody().strength(-5000))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      // Sets center force to the middle of the visualization
      .force(
        "center",
        d3.forceCenter(this.graphWidth / 2, this.graphHeight / 2)
      );

    this.renderGraph(this.graphData);
  },

  methods: {
    renderGraph(graphData) {
      // Ignore empty graph
      if (!graphData.edges || !graphData.nodes) {
        return;
      }

      // First clear the graph
      d3.selectAll(".edges").remove();
      d3.selectAll(".nodes").remove();

      // Pre-process the nodes and edges
      let nodes = [];
      let edges = [];
      for (const srcKey of Object.keys(graphData.edges)) {
        for (const tgtKey of Object.keys(graphData.edges[srcKey])) {
          edges.push({
            source: srcKey,
            target: tgtKey,
            weight: graphData.edges[srcKey][tgtKey].weight
          });
        }
      }

      for (const nodeKey of Object.keys(graphData.nodes)) {
        nodes.push({
          id: nodeKey,
          label: graphData.nodes[nodeKey].label,
          degree: 0.4
        });
      }

      console.log(nodes, edges);

      const linkLayer = d3
        .select("svg")
        .append("g")
        .attr("class", "edges")
        .attr("width", this.graphWidth)
        .attr("height", this.graphHeight)
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", "#000000")
        .attr("stroke-opacity", 0.1)
        .attr("stroke-width", d => {
          return (1.05 - d.weight) * 60;
        });

      const nodeLayer = d3
        .select("svg")
        .append("g")
        .attr("class", "nodes")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("fill", "purple")
        .attr("y", this.radius + "px");

      // Initiate force simulation, set nodes to specified array
      this.force
        // Adds nodes, assigns x/y positions and x/y velocity based on the forces declared in the variable "force"
        .nodes(nodes)
        // .on(tick) increments the "tick" counter by 1,
        // Initiates the "ticked" function to position nodes and edges
        .on("tick", ticked);

      // Declares the links to be used in the link force
      this.force.force("link").links(edges);

      // Set node and link positioning based on "tick" function
      // Basically waits for all elements to be processed,
      // increments the tick timer by 1, then positions objects
      function ticked() {
        linkLayer
          .attr("x1", d => {
            return d.source.x;
          })
          .attr("y1", d => {
            return d.source.y;
          })
          .attr("x2", d => {
            return d.target.x;
          })
          .attr("y2", d => {
            return d.target.y;
          });

        nodeLayer
          .attr("x", d => {
            return d.x;
          })

          .attr("y", d => {
            return d.y;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
