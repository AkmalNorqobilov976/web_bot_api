<template>
    <input type="checkbox" @change="updateModel($event)"/>
    <label for=""></label>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        modelValue: {},
        idKey: {}
    },
    setup(props) {
        const updateModel = (e) => {
            emit('update:modelValue', e.target.value);
        }

        return {
            updateModel
        }
    },
})
</script>
