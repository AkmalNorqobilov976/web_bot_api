<template>
    <div class="login">
        <p class="login__title" v-if="!auth.smsIsSent">Tizimga kirish</p>
        <form @submit.prevent class="login__form">
            <div class="login__form--phone" v-if="!auth.smsIsSent">
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
            
          

            <div v-if="auth.smsIsSent" class="login__form--verification">
                <p class="login__form--verification--title">SMS kod yuborildi</p>
                <p class="login__form--verification--subtitle">
                    SMS kod +998 {{userInfo.phone}} raqamiga yuborildi
                </p>
                <verification-input ref="verificationInput"/>
                <p @click="backPhoneNumber" class="login__form--verification--btn">Nomerni o'zgartirish</p>
            </div>
                <!-- :disabled="!auth.smsIsSent ? true : false" -->
        </form>

            <!-- <button 
                class="login__form--submit-btn"
                :class="[{ disabled : !auth.smsIsSent}, {'phoneEntered': userInfo.phone}]"
                @click="login"
            > {{!auth.smsIsSent ? 'SMS kodni olish' : 'Kirish'}} </button> -->
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import VerificationInput from '@/components/Form/inputs/VerificationInput.vue'
import { defineComponent, onMounted, onUnmounted, watch, watchEffect } from 'vue-demi';
import { usePhoneNumberPatternMatch } from '@/composables/usePhoneNumberPatternMatch'
import { useTelegram } from '@/composables/useTelegram';
import { myProfile, sendPhone, verifyCode } from '@/api/authApi'
import { setToken } from '@/utils/localStorage';
import { useToastStore } from '@/store/useToastStore';
export default defineComponent( {
    mounted() {
        this.$refs.phoneInput.focus();
    },
    setup() {
        const verificationInput = ref(null)
        const auth = useAuthStore();
        const router = useRouter();
        const { tg, tgSetParamsToMainButton, showMainButton, hideMainButton } = useTelegram();
        const toastStore = useToastStore();
        const userInfo = reactive({
            phone: "",
            isAgree: false,
            code: "467"
        });
        const phoneInput = ref(null)
        const backPhoneNumber = () => {
            auth.$patch({
                smsIsSent: false
            });
        }
      
        const onPhoneInput = ($event) => {
            $event.target.value = usePhoneNumberPatternMatch($event.target.value);
            // console.log($event.target.value, "event");
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

        // tg.MainButton.onClick(() => {
        //     if(!auth.$state.smsIsSent) {
        //         sendPhoneNumber();
        //     }
        //     else {
        //         sendCode();
        //     }

        //     tg.MainButton.offClick(() => {
                
        //     });
        // })

        const sendPhoneNumber = () => {
            sendPhone({ phone: `+998${userInfo.phone.split(' ').join('').split('-').join('')}` })
            .then((response) => {
                // console.log(response);
                auth.$patch({
                    smsIsSent: true,
                    userInfo: {
                        ...auth.$state,
                        phone: `+998${userInfo.phone.split(' ').join('').split('-').join('')}`   
                    }
                });
                tgSetParamsToMainButton({
                    text: "Kirish",
                    color: "#51AEE7",
                    disabled: false
                });
                
                return tg.MainButton.offClick(() => {
                    hideMainButton()
                });
            }).catch((error) => {
                    // console.log(error);
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                return tg.MainButton.offClick(() => {
                });
            })
        }

        const sendCode = () => {
            verifyCode({
                phone: auth.$state.userInfo.phone,
                code: auth.$state.code
            }).then((response) => {
                auth.$patch({
                    token: response.data.data,
                    isAuthenticated: true
                });
                
                setToken(response.data.data);
                // myProfile()
                //     .then(() => {
                //         router.push('/');
                //     })

                return tg.MainButton.offClick(() => {
                    alert('Offed');
                });

            }).catch((error) => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    type: 'error',
                    delayTime: 1000
                })
                return tg.MainButton.offClick(() => {
                    alert('Offed')
                });
            })
        }
        
        watchEffect(() => {
            if (!auth.$state.smsIsSent) {
                // tgSetParamsToMainButton({
                //     text: "SMS kodni olish",
                //     color: "#E4E6E4",
                //     textColor: "#8C8C8C",
                //     disabled: true
                // })
            }

            console.log("hello")
        })

        
          onMounted(() => {
            showMainButton();
        });
        onUnmounted(() => {
            hideMainButton()
        })
        return {
            userInfo,
            // login,
            auth,
            backPhoneNumber,
            onPhoneInput
        }
    },
    components: {
        VerificationInput
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