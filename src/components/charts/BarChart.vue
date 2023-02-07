<template>
  <div class="bar-chart"></div>
</template>

<script>
import { defineComponent, onMounted, watchEffect } from "vue-demi";
import * as d3 from 'd3'
export default defineComponent({
    props: {
        xKey: {
            default: 'name'
        },
        yKey: {
            default: 'value'
        },
        chartData: {
            default: () => [{ name: "0", value: 25 },
          { name: "1", value: 40 },
          { name: "2", value: 15 },
          { name: "3", value: 430 },
          { name: "4", value: 15 },
          { name: "5", value: 460 },
          { name: "6", value: 15 },
          { name: "7", value: 4 },
          { name: "8", value: 15 },
          { name: "9", value: 50 },
          { name: "10", value: 15 },
          { name: "11", value: 10 },]
        }
    },
  setup(props) {
    onMounted(() => {
      watchEffect(() => {

        const margin = { top: 20, right: 10, bottom: 40, left: 35 };
        const svgWidth = 360;
        const svgHeight = 290;
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3
          .select(".bar-chart")
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        console.log(svg);
        const graphArea = svg
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3
          .scaleBand()
          .rangeRound([0, width])
          .domain(props.chartData.map((d) => d[props.xKey]))
          .padding(0.2);

        const y = d3
          .scaleLinear()
          .range([height, 0])
          .domain([
            d3.min(props.chartData, (d) => d[props.yKey]) - 5,
            d3.max(props.chartData, (d) => d[props.yKey]) + 5,
          ])
          .nice();

        const xAxis = d3.axisBottom(x).tickSize(0);
        const yAxis = d3.axisLeft(y).ticks(5).tickSize(0);

        graphArea
          .append("g")
          .attr("class", "axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);

        graphArea.append("g").attr("class", "axis").call(yAxis);

        const rx = 8;
        const ry = 8;

        graphArea
          .selectAll("bar")
          .data(props.chartData)
          .enter()
          .append("path")
          .style("fill", (d, i) => {
            if(i % 2 == 1) {
                return '#ED5974'
            } else {
                return '#51AEE7'
            }
          })
          .attr(
            "d",
            (item) => `
        M${x(item[props.xKey])},${y(item[props.yKey]) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${x.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - y(item[props.yKey]) - ry}
        h${-x.bandwidth()}Z
      `
          );
      });
    });
  },
});
</script>