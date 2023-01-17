<template>
    <div class="balans-history-bar-chart">

    </div>
</template>

<script setup>
    import { ref, onBeforeMount } from "vue";
    import * as d3 from 'd3'
    const dataInfo = ref([
        {name: "Simon", score: 80},
        {name: "Mary", score: 90},
        {name: "John", score: 60}
    ])

    const boxSizes  = ref({
        width: 360,
        height: 160,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    })

    const renderChart = () => {
         d3.selectAll('.balans-history-bar-chart')
            .append('svg')
            .attr('height', boxSizes.value.height - boxSizes.value.margin.top - boxSizes.value.margin.bottom)
            .attr('width', boxSizes.value.width - boxSizes.value.margin.left - boxSizes.value.margin.right)
            .attr('viewBox', [0, 0, boxSizes.value.width, boxSizes.value.height])
    }
    
    onBeforeMount(() => {
        renderChart()
        
    })
       
</script>