<template>
    <div class="login">
        <p class="login__title">Tizimga kirish</p>
        <form @submit.prevent="sendPhoneNumber" class="login__form">
            <div class="login__form--phone">
                <span>+998</span>
                <input 
                    class="login__form--phone--input" 
                    type="text" 
                    ref="phoneInput"
                    placeholder="00 000 00 00"
                    v-model="userInfo.phone"
                    @input="onPhoneInput($event)"
                />
            </div>

            <div class="login__form--is-agree" v-if="!auth.smsIsSent">
                <input 
                    class="login__form--is-agree--input" 
                    type="checkbox" 
                    id="isAgree"
                    v-model="userInfo.isAgree"
                />
                <label 
                    for="isAgree"
                >Men foydalanish shartlari bilan tanishdim</label>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, onUnmounted, watch, watchEffect } from 'vue-demi';
import { usePhoneNumberPatternMatch } from '@/composables/usePhoneNumberPatternMatch'
import { useTelegram } from '@/composables/useTelegram';
import { sendPhone } from '@/api/authApi'
import { setToken, getToken } from '@/utils/localStorage';
import { useToastStore } from '@/store/useToastStore';
export default defineComponent( {
    mounted() {
        this.$refs.phoneInput.focus();
    },
    setup() {
        const auth = useAuthStore();
        const router = useRouter();
        const { tg, tgSetParamsToMainButton, showMainButton, hideMainButton } = useTelegram();
        const toastStore = useToastStore();
        const userInfo = reactive({
            phone: "",
            isAgree: false,
            code: "467"
        });
        const backPhoneNumber = () => {
            auth.$patch({
                smsIsSent: false
            });
        }
      
        const onPhoneInput = ($event) => {
            $event.target.value = usePhoneNumberPatternMatch($event.target.value);
            if(!$event.target.value) {
                userInfo.phone = $event.target.value;
                tgSetParamsToMainButton({
                    text: "SMS kodni olish",
                    textColor: "#8C8C8C",
                    color: "#E4E6E4",
                    disabled: true
                })
            } else {
                tgSetParamsToMainButton({
                    text: "SMS kodni olish",
                    textColor: "#fff",
                    color: "#51AEE7",
                    disabled: false
                })
            }
        }


        const sendPhoneNumber = () => {
            sendPhone({ phone: `+998${userInfo.phone.split(' ').join('').split('-').join('')}` })
            .then(() => {
                auth.$patch({
                    smsIsSent: true,
                    userInfo: {
                        ...auth.$state,
                        phone: `+998${userInfo.phone.split(' ').join('').split('-').join('')}`   
                    }
                });
                router.push('/verify-sms-code');
            }).catch((error) => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
            })
        }
        
        watchEffect(() => {
            if (!auth.$state.smsIsSent) {
                tgSetParamsToMainButton({
                        text: "SMS kodni olish",
                    color: "#E4E6E4",
                    textColor: "#8C8C8C",
                    disabled: true
                })
            }
        })


          onMounted(() => {
              if(getToken()) {
                  router.push('/');
            }

            tg.onEvent('mainButtonClicked', sendPhoneNumber)
            showMainButton();
        });
        onUnmounted(() => {
            tg.offEvent('mainButtonClicked', sendPhoneNumber)
            hideMainButton()
        })
        return {
            userInfo,
            // login,
            auth,
            backPhoneNumber,
            onPhoneInput,
            sendPhoneNumber
        }
    }
})
</script>

<style lang="scss" scoped>

    @mixin input-wrapper {
        border: .1rem solid $blue;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.75rem;
        font-size: 1.5rem;
        gap: .925rem;
        color: $soft-black;
        border-radius: 1rem;
    }
    .login {
        @include card-mixin;
        position: relative;
        padding: 2rem 1.6rem;
        font-weight: 500;
        height: 100vh;

        &__title {
            margin: 1.3rem .5rem;
            color: $blue;
            font-size: 1.5rem;
        }
        
        &__form {
            input[type="text"] {
                border: none;
                outline: none;
            }
            &--phone {
                @include input-wrapper;
                margin-top: 2.1rem;
                position: relative;
                gap: .6rem;
                &--input {
                    flex: 1 1 auto;
                    font-size: 1.5rem;
                    background: transparent;
                    padding-left: .6rem;
                    border-left: .1rem rgba($color: $blue, $alpha: .6) solid !important;
                    
                    &::placeholder {
                        color: $gray;
                    }
                }

                &::before {
                    content: 'Telefon raqamingiz';
                    width: max-content;
                    position: absolute;
                    z-index: 2;
                    top: -1rem;
                    color: $blue;
                    overflow: hidden;
                    background: $white;
                }
            }

            &--is-agree {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: .9rem;
                padding: .6rem 0rem 1.4rem;
                input[type="checkbox"] {
                    width: 1.7rem;
                    height: 1.7rem;
                    appearance: none;
                    border-radius: .4rem;
                    border: .1rem $blue solid;
                }

                input[type="checkbox"]:checked {
                    background: $blue !important;
                    position: relative;
                    &::after {
                        height: 100%;
                        width: 100%;
                        line-height: 50%;
                        padding: .5rem 0;
                        text-align: center;
                        color: white;
                        content: "\2714";
                        position: absolute;
                    }
                }
                label {
                    flex: 1 1 auto;
                    font-size: 1.3rem;
                    color: $gray;
                }
            }

            &--verification {
                text-align: center;
                &--title {
                    font-size: 1.7rem;
                    font-weight: 600;
                    margin-bottom: .8rem;
                }

                &--subtitle {
                    font-size: 1.5rem;
                    color: $gray;
                }
                &--btn {
                    color: $blue;
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 400;
                    text-decoration: underline;
                }
            }

            &--code {
                @include input-wrapper;

                input {
                    flex: 1 1 auto;
                    background: transparent;
                    color: rgba($color: #000000, $alpha: .45);
                }

                &--btn {
                    color: $blue;
                    font-size: 1.3rem;
                    cursor: pointer;
                }
            }

            &--submit-btn {
                position: absolute;
                bottom: 3rem;
                left: 5%;
                width: 90%;
                @include btn-mixin;
                padding: 1.6rem 0;
                color: $white;
                margin-top: 1.8rem;
                background: $blue;

            }
        }
    }
    .disabled {
        background: #E4E6E4 !important;
        color: $gray !important;
    }

    .phoneEntered {
        background: $blue !important;
        color: $white !important;
    }
</style>