<template>
    <teleport to="body">
        <div class="confirm" v-if="showConfirm">
            <div class="confirm-screen">
                    <div class="confirm-screen__body">
                        <p class="confirm-screen__body--title">
                            {{ title }}
                        </p>
                        <p class="confirm-screen__body--subtitle">
                            {{ subtitle }}
                        </p>
                        <div class="confirm-screen__body--action">
                            <button 
                                @click="$emit('onConfirm', false)" 
                                class="confirm-screen__body--action--cancel"
                            >
                                {{ sayNo }}
                            </button>
                            <button 
                                @click="$emit('onConfirm', true)" 
                                class="confirm-screen__body--action--agree"
                            >
                                {{ sayYes }}
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    emits: ['onConfirm'],
    props: {
        sayNo: {
            default: 'Yo‘q, ortga qaytish'
        },
        sayYes: {
            default: 'Ha, bekor qilinsin'
        },
        showConfirm: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "To‘lo‘v uchun so‘rovingiz bekor qilinmoqda"
        },
        subtitle: {
            type: String,
            default: "Hisobingizga pul 10 daqiqa ichida qayta tushirib beriladi"
        }
    }
})
</script>

<style lang="scss" scoped>
    .confirm {
        position: relative;
        transition: all 1s ease;
        width: 100vw;
        height: 100vh;
        z-index: 5;
        &-screen {
            background: #8C8C8C40;
            backdrop-filter: blur(.2rem);
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 3.1rem;
            &__body {
                border-radius: .7rem;
                background: $white;
                display: block;
                font-size: 1.5rem;
                padding: 2rem 2.2rem;
                &--title {
                    color: $black;
                    font-size: 2rem;
                    font-weight: 500;
                    margin-bottom: 1.1rem;
                }
                &--subtitle {
                    color: $gray;
                    font-weight: 400;
                }
                &--action {
                    display: flex;
                    align-items: flex-end;
                    gap: 2.2rem;
                    flex-direction: column;
                    margin-top: 2.7rem;
                    text-transform: uppercase;
                    button {
                        border: none;
                        outline: none;
                        background: transparent;
                        font-size: 1.3rem;
                        text-transform: uppercase;
                    }

                    &--cancel {
                        color: $blue;
                        text-transform: uppercase;
                    }

                    &--agree {
                        color: $red;
                    }
                }

            }
        }
    }

    
.loading-enter-active {
  animation: enter 0.2s ease-out;
}

.loading-leave-active {
  animation: leave 0.2s ease-in;
}



@keyframes enter {
  0% {
    opacity: 0%;
    transform: scale(0);
  }
  100% {
    opacity: 100%;
    transform: scale(1);
  }
}

@keyframes leave {
  0% {
    transform: scale(1);
    opacity: 100%;
  }
  100% {
    transform: scale(0);
    opacity: 0%;
  }
}

</style>