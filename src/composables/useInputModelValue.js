import { defineEmits } from 'vue'

export function useInputModelValue() {
    const emit = defineEmits(['update:modelValue'])
    const updateModel = (e) => {
        emit('update:modelValue', e.target.value);
    }

    return {
        updateModel
    }
}