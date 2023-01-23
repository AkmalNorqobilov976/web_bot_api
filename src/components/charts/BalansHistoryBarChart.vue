<template>
  <div id="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight">
      <g>
        <path d="M309 173.6C309 170.24 309 168.56 309.654 167.276C310.229 166.147 311.147 165.229 312.276 164.654C313.56 164 315.24 164 318.6 164H329.4C332.76 164 334.44 164 335.724 164.654C336.853 165.229 337.771 166.147 338.346 167.276C339 168.56 339 170.24 339 173.6V250H309V173.6Z" fill="#51AEE7"></path>
        <rect
          v-for="item in data"
          class="bar-positive"
          :key="item[xKey]"
          :x="xScale(item[xKey])"
          :y="yScale(0)"
          :width="xScale.bandwidth()"
          :height="0"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { selectAll } from "d3-selection";
import { transition } from "d3-transition";

export default {
  name: "BarChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.AddResizeListener();
    this.AnimateLoad();
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true
  }),
  methods: {
    AnimateLoad() {
      selectAll("rect")
        .data(this.data)
        .transition()
        .delay((d, i) => {
          return i * 150;
        })
        .duration(1000)
        .attr("y", d => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", d => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
    },
    AddResizeListener() {
      // redraw the chart 300ms after the window has been resized
      window.addEventListener("resize", () => {
        this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth =
            document.getElementById("container").offsetWidth * 0.9;
          this.AnimateLoad();
        }, 300);
      });
    }
  },
  computed: {
    dataMax() {
      return max(this.data, d => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return min(this.data, d => {
        return d[this.yKey];
      });
    },
    xScale() {
      return scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.data.map(d => {
            return d[this.xKey];
          })
        );
    },
    yScale() {
      return scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    }
  }
};
</script>

<style lang="scss" scoped>
// $bar-chart-blue: #51AEE7;
.bar-positive {
    border-bottom-left-radius: .6rem;
    border-bottom-right-radius: .6rem;
    transition: r 0.2s ease-in-out;
}
.bar-positive:nth-child(odd) {
  fill: $blue;
}
.bar-positive:nth-child(even) {
  fill: $red;
}

.svg-container {
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
    h1 {
        text-align: left;
        padding-left: 1.6rem;
        color: $gray-variant;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
}
</style>
