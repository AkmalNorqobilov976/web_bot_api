<template>
    <div class="login">
        <form @submit.prevent="sendCode" class="login__form">
            <div class="login__form--verification">
                <lock-icon class="login__form--verification--lock-icon"/>
                <p class="login__form--verification--title">Kodni kiriting !</p>
                <p class="login__form--verification--subtitle">
                    SMS kod +998 {{usePhoneNumberPatternMatch(auth.userInfo.phone)}} raqamiga yuborildi
                </p>
                <verification-input/>
                <p @click="$router.push('/login')" class="login__form--verification--btn">Nomerni o'zgartirish</p>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import VerificationInput from '@/components/Form/inputs/VerificationInput.vue'
import { computed, defineComponent, onMounted, onUnmounted, watchEffect } from 'vue-demi';
import { useTelegram } from '@/composables/useTelegram';
import { verifyCode } from '@/api/authApi'
import { setToken } from '@/utils/localStorage';
import LockIcon from '@/assets/icons/LockIcon.vue'
import { useToastStore } from '@/store/useToastStore';
import { usePhoneNumberPatternMatch } from '@/composables/usePhoneNumberPatternMatch';
export default defineComponent( {
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

        const sendCode = () => {
            verifyCode({
                phone: auth.userInfo.phone,
                code: auth.$state.code
            }).then((response) => {
                auth.$patch({
                    token: response.data.data,
                    isAuthenticated: true
                });
                setToken(response.data.data)
                .then(() => {
                    auth.getUserInfo()
                        .then(() => {
                            router.push('/')
                        })
                        .catch(error => {
                            toastStore.showToastAsAlert({
                                message: error.response.data.message,
                                type: 'error',
                                delayTime: 1000
                            })
                        })
                });

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
            showMainButton();
            tgSetParamsToMainButton({
                disabled: false,
                textColor: '#ffffff',
                color: "#51AEE7",
                text: "Kirish"
            });
            tg.onEvent('mainButtonClicked', sendCode)
        });

        onUnmounted(() => {
            hideMainButton()
            tg.offEvent('mainButtonClicked', sendCode)
        })
        
        return {
            userInfo,
            auth,
            sendCode,
            usePhoneNumberPatternMatch
        }
    },
    components: {
        VerificationInput,
        LockIcon
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
                &--lock-icon {
                    margin-top: 4.2rem;
                    margin-bottom: 2.8rem;
                }
                &--title {
                    font-size: 1.7rem;
                    font-weight: 600;
                    margin-bottom: .8rem;
                }

                &--subtitle {
                    font-size: 1.5rem;
                    color: $gray;
                    input {
                        font-size: 1.5rem;
                        color: $gray;
                        display: inline;
                        border: none;
                        outline: none;
                        max-width: min-content;
                    }
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