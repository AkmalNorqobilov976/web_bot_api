<script setup>
import { defineProps } from 'vue';

    defineProps({
        label: {
            type: String,
            default: "Bu nomdagi Oqim linki mavjud"
        }
    })
</script>
<template>
    <div class="tooltip">
        {{label}}        
    </div>
</template>

<style lang="scss" scoped>
    .tooltip {
        position: absolute;
        border-radius: .316rem;
        color: $white;
        padding: .75rem .8rem;
        background: rgba(0, 0, 0, 0.75);
        &::before {
            content: '';
            position: absolute;
            z-index: 3;
            overflow: hidden;
            top: -1.8rem;
            background: inherit;
            height: 2rem;
            width: 2rem;
            clip-path: polygon(
                50% 70%,
                100% 100%,
                0% 100%
            );
            
        }
    }
</style>

