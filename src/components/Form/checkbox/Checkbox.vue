<template>
    <div class="checkbox">
        <input :id="idKey" class="checkbox__input" type="checkbox" @change="updateModel($event)"/>
        <label :for="idKey" class="checkbox__label">{{ label }}</label>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        modelValue: {},
        idKey: {},
        label: {}
    },
    setup(props, { emit }) {
        const updateModel = (e) => {
            emit('update:modelValue', e.target.checked);
        }

        return {
            updateModel
        }
    },
})
</script>
<style lang="scss" scoped>
    .checkbox {
        display: flex;
        gap: .9rem;
        align-items: center;
        &__input {
            height: 1.7rem;
            width: 1.7rem;
            appearance: none;
            border-radius: .3rem;
            border: .158333rem solid #868686;
            &:checked {
                background: $blue;
                border: $blue;
                background-image: url("@/assets/svgs/checkIcon.svg");
            }
        }

        &__label {
            font-size: 1.3rem;
            font-weight: 400;
            color: $gray;
        }
    }
</style>