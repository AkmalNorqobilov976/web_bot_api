<template>
    <div class="login">
        {{userInfo.phone}}
        <p class="login__title" v-if="!auth.smsIsSent">Tizimga kirish</p>
        <form @submit.prevent class="login__form">
            <div class="login__form--phone" v-if="!auth.smsIsSent">
                <span>+998</span>
                <input 
                    class="login__form--phone--input" 
                    type="text" 
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

            <div v-if="auth.smsIsSent" class="login__form--verification">
                <p class="login__form--verification--title">SMS kod yuborildi</p>
                <p class="login__form--verification--subtitle">
                    SMS kod +998 90 000-23-13 raqamiga yuborildi
                </p>
                <verification-input/>
                <p @click="backPhoneNumber" class="login__form--verification--btn">Qayta yuborish</p>
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
import { reactive } from '@vue/reactivity'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import VerificationInput from '@/components/Form/inputs/VerificationInput.vue'
import { defineComponent, onBeforeUnmount, watchEffect } from 'vue-demi';
import { usePhoneNumberPatternMatch } from '@/composables/usePhoneNumberPatternMatch'
import { useTelegram } from '@/composables/useTelegram';
import { sendPhone, verifyCode } from '@/api/authApi'
export default defineComponent( {
    setup() {
        const auth = useAuthStore();
        const router = useRouter();
        const { tg } = useTelegram();
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

        // const login = () => {
        //     if(!auth.$state.smsIsSent) {

        //         auth.$patch({smsIsSent: true})
        //     } else {
                
        //         auth.$patch({
        //             isAuthenticated: true,
        //             userInfo: userInfo
        //         })
        //         router.push('/');            
        //     }
        //     console.log("ishlasangchi");
        // }
        
        const onPhoneInput = ($event) => {
            $event.target.value = usePhoneNumberPatternMatch($event.target.value);
        }



        watchEffect(() => {
            if (!auth.$state.smsIsSent) {
                tg.MainButton.setParams({
                    text: "SMS kodni olish",
                    textColor: "#8C8C8C",
                    color: "#E4E6E4"
                });
            }

            tg.MainButton.show();
            if(userInfo.phone.length) {
                tg.MainButton.setParams({
                    textColor: "#fff",
                    color: "#51AEE7"
                })
            } else {
                tg.MainButton.setParams({
                    textColor: "#8C8C8C",
                    color: "#E4E6E4"
                })

            }
            tg.MainButton.onClick(() => {
                alert("hi")
                if(!auth.$state.smsIsSent) {
                    sendPhone({ phone: `+998${userInfo.phone.split(' ').join('')}` })
                    .then(response => {
                        auth.$patch({
                            smsIsSent: true
                        });
                        tg.MainButton.setParams({
                            text: "Kirish",
                        });
                        alert(JSON.parse(JSON.stringify(response)));


                    })
                } else {
                    verifyCode({
                        phone: userInfo.phone,
                        code: userInfo.code
                    }).then(response => {
                        alert(JSON.parse(JSON.stringify(response)));
                        router.push('/')
                    })
                }
            })
        })

        onBeforeUnmount(() => {
            tg.MainButton.hide();
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