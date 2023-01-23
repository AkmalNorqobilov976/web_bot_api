<template>
    <div class="barchart">
        <svg 
            :viewBox="`0 0 ${barChartWidth} ${barChartHeight}`" 
            xmlns="http://www.w3.org/2000/svg"
            class="main-part"
        >   
            <g 
                v-for="(item, i) in chartData" 
                :key="i" opacity="1" 
                class="yAxis"
                :transform="`translate(0, ${i * 50})`"
            >
                <text fill="currentColor" x="5" :y="-20" dy="10px">{{chartData[chartData.length - 1 - i].name}}</text>
            </g>
            <g v-for="(item, i) in chartData" :key="i">
                <path :d="` M${x(item.name) + 10},${y(item.value) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${barChartHeight - y(item.value) - ry}
                    h${-(x.bandwidth() )}Z`"
                    class="barchart-pillar"
                    :class="[{'blue': i % 2 == 0}, {'red': i % 2 == 1}]"
                ></path>
            </g>
        </svg>
        <svg :viewBox="`0 0 ${barChartWidth} ${10}`" 
            xmlns="http://www.w3.org/2000/svg">
            <g v-for="(item, i) in chartData" :key="i" opacity="1" :transform="`translate(${i * barChartWidth / chartData.length}, 0)`">
                <text fill="currentColor" text-anchor="start" x="0" dx="2rem" y="10">{{ x(item.name) }}</text>
            </g>
        </svg>
    </div>    
</template>

<script>
import { scaleLinear, min, max, scaleBand, axisBottom, axisLeft } from "d3";
import { defineComponent, computed } from "vue-demi";

export default defineComponent({
    props: {
        rx: {
            default: 5
        },
        ry: {
            default: 5
        },
        marginTop: {
            default: 0
        },
        marginRight: {
            default: 20
        },
        marginBottom: {
            default: 0
        },
        marginLeft: {
            default: 0
        },
        barChartHeight: {
            default: 296
        },
        barChartWidth: {
            default: 300
        },
        format: {
            default: ""
        },
        chartData: {
            type: Array,
            default: () => [
                { name: "0k",      value: 25 },
                { name: "10k", value: 40},
                { name: "20k",   value: 15 },
                { name: "30k",      value: 10},
                { name: "40k",      value: 100 },
                { name: "50k", value: 2},
                { name: "60k",   value: 40 },
             
            ]
        },
        xKey: {
            default: "value"
        },
        yKey: {
            default: "name"
        }
    },
    setup(props) {
        const x = computed(() => {
            
            return scaleBand()
                .rangeRound([0, props.barChartWidth])
                .domain(props.chartData.map(d => d[props.yKey]))
                .padding(0.4);
            // return scaleLinear().domain([0, max(props.chartData, (d) => d[props.xKey])])
            //     .range(props.marginLeft, props.barChartWidth - props.marginRight);
        })

        const y = computed(() => {
             return scaleLinear()
                .range([props.barChartHeight, 0])
                .domain([
                    min(props.chartData, d => d[props.xKey]) - 5,
                    max(props.chartData, d => d[props.xKey]) + 5
                ])
                .nice();
            // return scaleBand().domain([range(props.chartData.length)])
            //     .rangeRound([props.marginTop, props.barChartHeight - props.marginBottom])
            //     .padding(.1);
        })
        
        const formattedText = computed(() => {
            return y.value.tickFormat(20, props.format)
        })
        
        const xAxis = computed(() => {
            return axisBottom(x).tickSize(0)
        })

        const yAxis = computed(() => {
            return axisLeft(y).tickSize(0)
        });
        return {
            x,
            y,
            formattedText,
            xAxis,
            yAxis
        }
    },
})
</script>

<style lang="scss" scoped>
    .blue {
        fill: $blue;
    }
    .red {
        fill: $lighten-red;
    }

    .yAxis {
        color: $gray;
        font-weight: 400;
    }

    .xAxis {
        color: $black;
        font-weight: 500;
    }

    .main-part {
        border-bottom: .1rem #D9D9D9 solid;
    }

    .barchart {
        margin-bottom: 1.3rem;
    }
</style>