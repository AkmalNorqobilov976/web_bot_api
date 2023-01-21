<template>
    <div class="under-line-input">
        <label class="under-line-input--label" for="">{{ label }}</label>
        <input class="under-line-input--field" type="text" v-bind="$attrs" :value="modelValue" @input="updateModel">
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from "vue";
    const emit = defineEmits(['update:modelValue'])
    const updateModel = (e) => {
        emit('update:modelValue', e.target.value);
    }
    defineProps({
        label: {},
        modelValue: {}
    })
</script>


<style lang="scss" scoped>
    .under-line-input {
        &--label {
            display: block;
            font-size: 1.3rem;
            font-weight: 400;
            color: $blue;
        }

        &--field {
            border: none;
            outline: none;
            width: 100%;
            padding: .6rem 0;
            font-size: 1.6rem;
            font-weight: 500;
            border-bottom: .1rem solid $input-border-bottom;
            transition: border .3s ease;
        }
        input:focus {
            border-bottom: .1rem solid $blue;
        }


    }
</style>