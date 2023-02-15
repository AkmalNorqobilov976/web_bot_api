<template>
    <input 
        v-mask="cardMask" 
        :value="modelValue"
        placeholder="0000 1111 2222 3333" 
        @input="onUpdateModel($event)"
        :class="{ 'shake error-text': isCardError }"
        inputmode="decimal"
    />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        modelValue: {}
    },
    emits: ['update:modelValue'],
    setup(props, context) {
        const isCardError = ref(false);
        const lengthLessThan16 = ref(true);
        const cardMask = ref('{{9999}} {{9999}} {{9999}} {{9999}}');

        const mustBeCool = (value) =>{
            if(value.replace(/\D/g, '').length == 16) {
                lengthLessThan16.value = false;
            } 
            return value.replace(/\D/g, '').length <= 16
        }

        const onUpdateModel = (e) => {
            console.log(e.target.value);
            if(mustBeCool(e.target.value)) {
                isCardError.value = false;
                context.emit('update:modelValue', e.target.value)
            } else {
                isCardError.value = true;
            }
        }

        context.expose({ lengthLessThan16 });
        return {
            cardMask,
            isCardError,
            onUpdateModel
        }
    },
})
</script>
