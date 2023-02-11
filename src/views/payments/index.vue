<template>
    <custom-confirm :showConfirm="showConfirm" @onConfirm="onConfirm($event)"/>

    <div class="d-grid-max-content">
        <p style="font-size: 3rem;">
        </p>
        <div class="payment">
            <div class="payment__card-info">
                <div>
                    <p class="payment__card-info--title">Hisobingizda</p>
                    <p class="payment__card-info--balance">{{ authStore.$state.userInfo.balance }} uzs</p>
                    <p class="payment__card-info--guess-balance">
                        Taxminiy balans: <span>{{ authStore.$state.userInfo.hold_balance }} uzs</span>
                    </p>
                </div>
                
                <div class="payment__btn-grp">
                    <div class="payment__btn-grp--btn">
                        <div class="payment__btn-grp--btn--1">
                            <i class="ri-copper-diamond-fill"></i>
                            {{ authStore.$state.userInfo.coins }}
                        </div>
                    </div>
                    <div class="payment__btn-grp--btn">
                        <div class="payment__btn-grp--btn--2">
                            <i class="ri-file-list-fill"></i>
                            {{ authStore.$state.userInfo.id }}
                        </div>
                    </div>
                </div>

            </div>

            <section class="payment-debit-card-form">
                <p class="payment-debit-card-form__title">Hisobdan pul yechish</p>
                <form @submit.prevent class="payment-debit-card-form__form">
                    <label for="payment-debit-card-form__form--label">Karta raqami</label>
                    <input 
                        v-mask="cardMask" 
                        v-model="paymentForm.card_number"
                        placeholder="0000 1111 2222 3333" 
                        :class="{ 'shake error-text': $v.card_number.$errors.length }"
                    />
                </form>
            </section>
            <section class="payment-form">
                <form @submit.prevent class="payment-form__form">
                    <input 
                        class="payment-form__form--input" 
                        v-model="paymentForm.amount"
                        v-resizable
                        v-money3="config"
                        :class="{ 'shake error-text': $v.amount.$errors.length }"
                    />
                    <span> uzs</span>
                </form>
                <div class="payment-form__suggestions">
                    <span @click="paymentForm.amount = authStore.$state.userInfo.balance * 0.1" class="payment-form__suggestions-item">
                        10%
                    </span>
                    <span @click="paymentForm.amount = authStore.$state.userInfo.balance * 0.2" class="payment-form__suggestions-item">
                        25%
                    </span>
                    <span @click="paymentForm.amount = authStore.$state.userInfo.balance * 0.5" class="payment-form__suggestions-item">
                        50%
                    </span>
                    <span @click="paymentForm.amount = authStore.$state.userInfo.balance * 0.75" class="payment-form__suggestions-item">
                        100%
                    </span>
                </div>
            </section>
            <section ref="scrollComponent" class="payment-expected" v-if="withdrawsStore.getNewWithdraws.length">
                <p class="payment-expected__title">Kutilayotgan to‘lo‘vlar</p>
                <div
                    v-for="(withdraw, i) in withdrawsStore.$state.withdraws"
                    :key="i"
                >
                    <PaymentListComponent v-if="withdraw.status == 'new'" :cardData="withdraw"> 
                        <template #cancel-btn>
                            <div class="cancel-btn" @click="showConfirm = true">
                                <i class="ri-close-line"></i>
                                Bekor qilish
                            </div>
                        </template>
                    </PaymentListComponent>
                </div>
            </section>

            <section class="payment-history" v-if="withdrawsStore.$state.withdraws.length">
                <p class="payment-history__title">O‘tkazmalar tarixi</p>
                <payment-list-component
                    v-for="(withdraw, i) in withdrawsStore.$state.withdraws"
                    :key="i"
                    :cardData="withdraw"
                /> 
            </section>
        </div>
        <message-not-found v-if="!withdrawsStore.$state.withdraws.length"/>
    </div>
</template>

<script>
import PaymentListComponent from '@/components/payments/PaymentListComponent.vue'
import CustomConfirm from '@/components/CustomConfirm.vue'
import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import { useBackButton } from '@/composables/useBackButton'
import { useTelegram } from '@/composables/useTelegram'
import { useWithdrawsStore } from '@/store/server/useWithdrawsStore'
import { postAdminWithdraw } from '@/api/advertiserApi'
import { useToastStore } from '@/store/useToastStore'
import { useAuthStore } from '@/store/authStore'
import { useLastRoute } from '@/composables/useLastRoute'
import MessageNotFound from '@/components/MessageNotFound.vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, maxValue, required } from '@vuelidate/validators'
export default {
    
    setup() {
        const toastStore = useToastStore();
        const scrollComponent = ref();
        const authStore = useAuthStore();
        const showConfirm = ref(false);
        const cardMask = ref('{{9999}} {{9999}} {{9999}} {{9999}}');
        const config = ref({
            prefix: '',
            suffix: '',
            thousands: '',
            decimal: '.',
            precision: 0,
            disableNegative: false,
            disabled: false,
            min: null,
            max: authStore.$state.userInfo.balance,
            allowBlank: false,
            minimumNumberOfCharacters: 0,
        })
        useLastRoute().setLastRoute();
        const paymentForm = reactive({
            card_number: "",
            amount: "0"
        })
        const mustBeCool = (value) =>{
            return value.replace(/\D/g, '').length == 16
        }
        const paymentFormValidationRules = {
            card_number: {
                mustBeCool
            },
            amount: {
                maxLength: maxLength(10),
                maxValue: maxValue(authStore.$state.userInfo.balance)

            }
        }
        const $v = useVuelidate(paymentFormValidationRules, paymentForm)
        const onConfirm = (e) => {
            showConfirm.value = false;
        }

        const withdrawsStore = useWithdrawsStore();
        const { backButton } = useBackButton()
        const { 
            tg, 
            tgSetParamsToMainButton, 
            tgMainButtonDisable, 
            tgMainButtonEnable, 
            showMainButton, 
            hideMainButton, 
            notificationOccurred 
        } = useTelegram();
        backButton()
        const inputForm = (e, key) => {
            paymentForm[key] = e.target.innerText
        }

        watch(paymentForm, (newValue) => {
            $v.value.$validate()
                .then(res => {
                    console.log(res);
                    if(!res) {
                        notificationOccurred('error')
                        tgMainButtonDisable()                
                        tgSetParamsToMainButton({
                            text: "Hisobni to‘ldirish",
                            color: "#E4E6E4",
                            textColor: "#8C8C8C",
                            disabled: true
                        });
                    } else {
                        tgMainButtonEnable()     
                        if(mustBeCool(newValue.card_number)) {
                            tgSetParamsToMainButton({
                                color: "#55BE61",
                                textColor: "#ffffff",
                                disabled: false
                            })           
                        }
                    }
                })
        }, {
            immediate: true
        })
        
        const getWithdraws = () => {
            withdrawsStore.getWithdraws()
                .then()
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error', 
                        delayTime: 3000
                    })
                })
        }
        onMounted(() => {
            showMainButton()
            authStore.getUserInfo()
                .then(() => {
                    paymentForm.amount = authStore.$state.userInfo.balance;
                })
            getWithdraws();
            tg.onEvent('mainButtonClicked', onPostAdminWithdraw)
        })

        onUnmounted(() => {
            tg.offEvent('mainButtonClicked', onPostAdminWithdraw)
            hideMainButton();
        })
        
    
        const onPostAdminWithdraw = () => {
            postAdminWithdraw({ 
                card_number: paymentForm.card_number.split(' ').join(''), 
                amount: paymentForm.amount 
            }).catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    delayTime: 3000,
                    type: 'error'
                });
            });
        }

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })
        const oldScrollY = ref(window.scrollY);
        const handleScroll = (e) => {

            let element = scrollComponent.value;
            if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 2 && oldScrollY.value < window.scrollY) {
                getWithdraws();
            }
            oldScrollY.value = window.scrollY
        }

        return {
            onConfirm,
            showConfirm,
            inputForm,
            paymentForm,
            authStore,
            withdrawsStore,
            onPostAdminWithdraw,
            cardMask,
            $v,
            config,
            scrollComponent
        }

        
    },
    components: {
        PaymentListComponent,
        CustomConfirm,
        MessageNotFound
    }
}
</script>
<style lang="scss" scoped>
    $bg-gr-color: #F6F9FB;
    .payment {
        &__card-info {
            @include card-mixin;
            padding: 2.5rem 1.6rem;
            font-weight: 400;
            font-size: 1.6rem;
            margin-bottom: .8rem;
            &--balance {
                font-size: 3.2rem;
                font-weight: 600;
                padding: 1rem 0;
            }

            &--guess-balance {
                color: $gray;
                span {
                    color: $black;
                    font-weight: 600;
                }
            }

        }
        &__btn-grp {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 1.2rem;

            &--btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .817rem;

                div {
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    justify-content: center;
                    gap: .6rem;
                    border: 1px solid #E9EBEA;
                    background: inherit;
                    padding: 1.217rem;
                    outline: none;
                    border-radius: .8rem;
                    font-size: 1.6rem;
                    font-weight: 600;
                    // a
                }

                &--1 {
                    color: $black;
                    i {
                        font-size: 2.5rem;
                    }
                }

                &--2 {
                    color: $blue;
                    i {
                        font-size: 2.2rem;
                    }
                }
            }

        }

        &-debit-card-form {
            // @include card-mixin;
            background: $bg-gr-color;
            &__title {
                padding: 1.9rem  1.6rem .9rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                // @include card-mixin;
                background: $white;
            }

            &__form {
                display: flex;
                flex-direction: column;
                justify-items: flex-start;
                // gap: 1rem;
                font-size: 1.5rem;
                overflow: hidden;
                label {
                    font-size: 1.6rem;
                    padding: .4rem 1.6rem;
                    color: $black;
                }
                input {
                       
                    padding: .8rem 1.6rem;
                    font-family: 'Roboto Mono', monospace;
                    font-weight: 400;
                    font-size: 3.2rem;
                    width: 100%;
                    word-spacing: -.5rem;
                    letter-spacing: -.1rem;
                    border: none;
                    outline: none;
                    background: inherit;
                    &::placeholder {
                        color: $gray-placeholder;
                    }
                }
                span {
                    color: $gray;
                }


            }
            
            &__suggestions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                text-align: center;
                padding: 0 1rem;
                gap: 1rem;
                padding-bottom: 1.6rem;
                &-item {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: $green;
                    background: #EAF7ED;
                    border-radius: 1.5rem;
                    padding: .7rem 1.8rem;

                }
            }
        }

        &-form {
            @include card-mixin;
            // background: rgba($color: #C2D9E7, $alpha: .15);
            background: $bg-gr-color;
            &__title {
                padding: 1.9rem  2.1rem .9rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                // @include card-mixin;
                background: $white;
            }

            &__form {
                display: inline-flex;
                align-items: center;
                justify-items: flex-start;
                // gap: 1rem;
                font-size: 3.6rem;
                padding: .8rem 1.6rem;
                &--input {
                    color: $black;
                    font-weight: 600;
                    font-size: inherit;
                    border: none;
                    outline: none;
                    background: inherit;
                    margin-right: .5rem;
                }
                & span:last-child {
                    color: $gray;
                }


            }
            
            &__suggestions {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                text-align: center;
                padding: 0 1rem;
                gap: 1rem;
                padding-bottom: 1.6rem;
                &-item {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: $green;
                    background: #EAF7ED;
                    border-radius: 1.5rem;
                    padding: .7rem 1.8rem;

                }
            }
        }

        &-expected {
            @include card-mixin;
            margin-top: .8rem;
            padding-bottom: 1.2rem;
            &__title {
                padding: 1.9rem  2.1rem .9rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                @include card-mixin;
            }

            .cancel-btn {
                @include btn-mixin;
                padding-top: .4rem;
                margin: 0 1.6rem;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: .6rem;
                border: 1px solid $red;
                border-radius: 7px;
                background: $white;
                padding: 1.05rem;
                font-size: 1.6rem;
                font-weight: 500;
                color: $red;
            }
        }
        &-history {
            @include card-mixin;
            margin-top: .8rem;
            background: #C2D9E715;
            &__title {
                padding: 1.9rem  2.1rem .9rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                @include card-mixin;
            }
        }

        
    }
</style>