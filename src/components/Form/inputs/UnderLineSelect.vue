<template>
    <div v-click-outside="onClickOutsideOfSelect" class="under-line-input position-relative" ref="clickOutsideOfInput">
        <label class="under-line-input--label" for="">{{ label }}</label>
        <div>
            <!-- {{options}} -->
           <div class="position-relative">
                <input 
                    class="under-line-input--field" 
                    @click.capture="isToggle = !isToggle" 
                    type="text" 
                    readonly
                    v-bind="$attrs" 
                    :value="inputValue" 
                >
                <i class="icon ri-arrow-drop-down-line" :class="{ 'rotate': isToggle }"></i>
           </div>
            <div v-if="isToggle" class="under-line-input__select-field position-absolute top-5 right-0 left-0 z-index-10">
                <div class="under-line-input__select-field--options">
                    <input class="under-line-input--field"
                        type="text" 
                        v-model="search"
                        placeholder="Qidiruv"
                    >
                    <div 
                        v-for="(option, i) in searchOptions"
                        :key="i"
                        @click="updateModel(option)"
                        class="under-line-input__select-field--options--list"
                    >
                        {{ option[text] }}
                    </div>
                    <div v-if="!searchOptions.length" class="under-line-input__select-field--options--list">
                        Topilmadi
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, defineComponent,  toRaw, onMounted, computed } from "vue";

    export default defineComponent({
        emits: ['update:modelValue'],
        props: {
            label: {},
            modelValue: {},
            phone: {
                default: ""
            },
            text: {},
            value: {},
            options: {
                default: () => []
            }
        },
        setup(props, context) {
            const isToggle = ref(false);
            const inputValue = computed(() => {
                let result = props.options.find(opt => opt.id == props.modelValue);
                return result?.[props.text];
            });
            const search = ref("");
            
            const searchOptions = computed(() => {
                return toRaw(props.options).filter(option => {
                                                if(option[props.text].includes(search.value)) {
                                                    return option;
                                                }
                                            });
            });
            const updateModel = (e) => {
                inputValue.value = e[props.text];
                isToggle.value = false;
                context.emit('update:modelValue', e[props.value]);
            }
            const onClickOutsideOfSelect = () => {
                isToggle.value = false;
            }

            const searchById = () => {
                return props.options.find(option => option.id == props.modelValue)
            } 
            onMounted(() => {
                let value = searchById();
                inputValue.value = value?.[props.text]
            })

            const resultValue = computed({
                get() {
                    return inputValue
                },
                set(val) {
                    inputValue.value = val;
                }
            })
            return {
                isToggle,
                search,
                updateModel,
                searchOptions,
                inputValue,
                onClickOutsideOfSelect,
                resultValue
            }
        }
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
            position: relative;
            border: none;
            outline: none;
            width: 100%;
            padding: .6rem 0;
            font-size: 1.6rem;
            font-weight: 500;
            border-bottom: .1rem solid $input-border-bottom;
            transition: border .3s ease;
            .icon {
                position: absolute;
                color: red;
            }
            &::before {
                position: absolute;
                content: v-bind('phone');
            }
        }
        &__select-field {
            @include card-mixin;
            max-height: 20rem;
            overflow-y: scroll;
            &--options {
                display: flex;
                gap: .5rem;
                flex-direction: column;
                font-size: 1.5rem;
                position: relative;

                input[type="text"] {
                    position: sticky;
                    top: 0;
                    padding: .6rem 1.6rem;
                }
                &--list {
                    padding: .5rem 1.6rem;
                    &:active {
                        background: $blue;
                    }
                    &:hover{
                         background: rgba($color: $red, $alpha: .6);
                    }
                }
            }
        }
        input:focus {
            border-bottom: .1rem solid $blue;
        }
        

    }

    .rotate {
        transform: rotateZ(180deg);
    }

    .icon {
        transition: all .3s ease;
        position: absolute;
        top: .7rem;
        right: 0rem;
        // display: flex;
        // align-items: center;
    }
</style>