<template>
    <div class="search-input">
        <i class="ri-search-line"></i>
        <input 
            class="search-input__input" 
            type="search" 
            :value="modelValue"
            @input="updateModel($event)" 
            v-bind="$attrs"
        />
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue'
    defineProps({
        modelValue: {},
        label: {
            type: String,
            default: "Qidirish"
        }
    })

    const emit = defineEmits(['update:modelValue'])
    const updateModel = (e) => {
        emit('update:modelValue', e.target.value);
    }
</script>


<style lang="scss" scoped>
    .search-input {
        display: flex;
        color: $gray;
        gap: 1.17rem;
        font-size: 1.6rem;
        align-items: center;
        padding: 1.07rem 1.97rem;
        &__input {
            flex-grow: 1;
            border: none;
            outline: none;
            background: $bg-color;
        }

    }
</style>