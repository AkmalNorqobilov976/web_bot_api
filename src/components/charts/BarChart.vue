<template>
    <div class="barchart" ref="barChart">
        <svg></svg>
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
    props: {
        chartData: {
            type: Array,
            default: () => [ 
                { name: "Sue",      value: 25 },
                { name: "Richards", value: 40},
                { name: "Johnny",   value: 15 },
                { name: "Ben",      value: 10}
            ]
        },
        top: {
            type: Number,
            default: 20
        },
        right: {
            type: Number,
            default: 20
        }, 
        bottom: {
            type: Number,
            default: 40
        }, 
        left: {
            type: Number,
            default: 45
        },
        svgWidth: {
            type: Number,
            default: 350
        },
        svgHeight: {
            type: Number,
            default: 200
        }
    },
    setup(props) {
        const barChart = ref(null)
        const svg = computed(() => {
            console.log(props.svgWidth);
            console.log(d3.select('.barchart'));
            return d3.select('.barchart')
                .append('svg')
                .attr('width', props.svgWidth)
                .attr('height', props.svgHeight);
        })
        console.log(svg.value.append('svg').attr('width', 100).attr('height', 100).attr('fill', 'blue'), "data");

    },
})
</script>



