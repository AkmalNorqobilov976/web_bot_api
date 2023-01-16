<template>
    <div class="under-line-input">
        <label for="">{{ label }}</label>
        <input type="text">
    </div>
</template>

<script>
import { defineProps } from 'vue'
export default {
    setup() {
        defineProps()
    },
}
</script>