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
    <div class="tooltip__btn">
        <slot name="tooltip"></slot>
    </div>
    <div class="tooltip" v-if="label">
        <div class="tooltip__label">
            {{label}}    
        </div>        
    </div>
</template>

<style lang="scss" scoped>
    .tooltip {
        position: relative;
        &__label {
            padding: .75rem .8rem;
            border-radius: .316rem;
            color: $white;
            top: .8rem;
            left: 1 rem;
            background: rgba(0, 0, 0, 0.75);
            position: absolute;
            z-index: 2;
            &::before {
                content: '';
                position: absolute;
                z-index: 3;
                overflow: hidden;
                top: -19.515px;
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
    }
</style>

