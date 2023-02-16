<template>
    <VueEcharts :option="chart_options" style="height: 290px" ref="chart" />
  </template>
  
  <script>
  import { VueEcharts } from "vue3-echarts";
  
  export default {
    components: {
      VueEcharts,
    },
    data() {
      return {
        chart_options: {
          color: ["#ED5974", "#51AEE7", "#EE6666"],
          tooltip: {
            trigger: "axis",
          },
        //   toolbox: {
        //     feature: {
        //       dataView: { show: true, readOnly: false },
        //       restore: { show: true },
        //       saveAsImage: { show: true },
        //     },
        //   },
        //   legend: {
        //     data: ["Evaporation", "Precipitation", "Temperature"],
        //   },
          xAxis: [
            {
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  width: 1,
                  color: "#999",
                },
              },
              type: "category",
              boundaryGap: true,
              axisLabel: {
                formatter: function (value) {
                  return value;
                },
              },
              // prettier-ignore
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
          ],
          yAxis: [
            {
              type: "value",
            //   name: "Evaporation",
              position: "left",
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#5470C6",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  width: 1,
                  color: "#999",
                },
              },
              axisLabel: {
                formatter: "{value}",
              },
            },
          ],
        //   dataZoom: [
        //     {
        //       type: "inside",
        //     },
        //     {
        //       type: "slider",
        //     },
        //   ],
          series: [
            {
              name: "Evaporation",
              type: "bar",
              stack: "ad",
              backgroundColor: "#4D86FF",
              itemStyle: {
                normal: { areaStyle: { type: "default" } },
              },
              data: [
                2.0,
                4.9,
                7.0,
                23.2,
                25.6,
                76.7,
                135.6,
                162.2,
                32.6,
                20.0,
                6.4,
                3.3,
              ],
            },
            {
              name: "Precipitation",
              type: "bar",
              stack: "ad",
              //yAxisIndex: 1,
              data: [
                2.6,
                5.9,
                9.0,
                26.4,
                28.7,
                70.7,
                175.6,
                182.2,
                48.7,
                18.8,
                6.0,
                2.3,
              ],
            },
          ],
        },
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  