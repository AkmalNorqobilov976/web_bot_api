<template>
    {{ transactionsStaticsStore }}
    <br>
    {{ dayComputed }}
    <br>
    {{ plusComputed }}
    <br>
    {{ minusComputed }}
    {{ option.yAxis }}
    <VueEcharts id="vue-echarts-id" :option="option" style="height: 290px;" ref="chart" />
  </template>
  
  <script>
  import { computed, defineComponent, onMounted, ref } from "vue";
import { VueEcharts } from "vue3-echarts";
  import { useTransactionStaticsStore } from '@/store/server/useTransactionStaticsStore'
import { useToastStore } from "@/store/useToastStore";
  export default defineComponent({
    components: {
      VueEcharts,
    },
    setup() {
        const transactionsStaticsStore = useTransactionStaticsStore();

        const toastStore = useToastStore();
        const formatterForMillion = () => {
          return Intl.NumberFormat('en', { notation: 'compact' });
        }
        const getTransactionStatics = () => {
            transactionsStaticsStore.getTransactionStatics()
            .catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    delayTime: 3000,
                    type: 'error'
                })
            })
        }

        const plusComputed = computed(() => {
            Object.keys(transactionsStaticsStore.transactionStatics || {})
            return transactionsStaticsStore.transactionStatics.reduce((prev,curr) => {
                return [...prev, curr.plus]
            }, []);
        })
        
        const minusComputed = computed(() => {
            return transactionsStaticsStore.transactionStatics.reduce((prev,curr) => {
                return [...prev, curr.minus]
            }, []);
        })
        
        const dayComputed = computed(() => {
            return transactionsStaticsStore.transactionStatics.reduce((prev,curr) => {
                console.log(new Date(Date.parse(curr.date)).getDate());
                return [...prev, new Date(Date.parse(curr.date)).getDate()]
            }, []);
        })
        const option = ref({
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
              data: dayComputed,
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
                  marginLeft: '20px'
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
                formatter (value) {
                  return Intl.NumberFormat('en', { notation: 'compact' }).format(value)
                },
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
              name: "minus",
              type: "bar",
              stack: "ad",
              backgroundColor: "#4D86FF",
              itemStyle: {
                normal: { areaStyle: { type: "default" } },
              },
              data: minusComputed,
            },
            {
              name: "Plus",
              type: "bar",
              stack: "ad",
              //yAxisIndex: 1,
              data:plusComputed,
            },
          ],
        })
        
        return {
            option,
            transactionsStaticsStore,
            minusComputed,
            plusComputed,
            dayComputed
        }
    }
  })
  </script>
  

  <style lang="scss" scoped>
    .vue-echarts-id {
      padding-left: 2rem;
    }
  </style>