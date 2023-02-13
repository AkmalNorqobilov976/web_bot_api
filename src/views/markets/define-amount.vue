<template>
    <main class="donation">
        <header class="donation-header">
            <i class="ri-percent-line"></i>
            <article class="donation-header__note">
                <p class="donation-header__note--title"> Diqqat eslatma! </p>
                <div class="donation-header__note--description">
                    Mahsulotga beriladigan chegirma birinchi mahsulotga {{ categoriesStore.$state.selectedProduct.admin_fee }} UZS gacha beriladi
                </div>
            </article>
        </header>

        <section class="donation-form">
            <p class="donation-form__title">Summani yozing</p>
            <form @submit.prevent class="donation-form__form">
                <input 
                    class="donation-form__form--input" 
                    v-model="defineAmountForm.discount"
                    v-money3="defineAmountConfig"
                    placeholder="10,000"
                    :class="{'shake error-text': isDefineAmountError}"
                    v-resizable
                    inputmode="decimal"
                />
                <span> uzs</span>
            </form>
        </section>

        <p class="donation-info">
            Diqqat! Mahsulot narxini tushurish admin bonusi evaziga amalga oshiriladi. Chegirma miqdorini kiritishdan oldin reklama harajatlarini hisobga oling.
        </p>
        <footer class="donation-footer">
            <article class="donation-footer__article">
                <i class="ri-price-tag-2-line"></i>
                <div>
                    <p class="donation-footer__article--title">Maxsulot chegirma bilan:</p>
                    <p class="donation-footer__article--info">{{ computedProfit }} so‘m</p>
                </div>
            </article>
        </footer>
    </main>
</template>

<script>
import { postAdminStream } from '@/api/advertiserApi';
import { useBackButton } from '@/composables/useBackButton'
import { useLastRoute } from '@/composables/useLastRoute';
import { useTelegram } from '@/composables/useTelegram';
import { useVMoney } from '@/composables/useVMoney';
import { useCategoriesStore } from '@/store/server/useCategoriesStore';
import { useStreamsStore } from '@/store/server/useStreamsStore';
import { useToastStore } from '@/store/useToastStore';
import { useVuelidate } from '@vuelidate/core';
import { maxValue } from '@vuelidate/validators';
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent ({
    setup() {
        const streamsStore = useStreamsStore();
        const toastStore = useToastStore();
        const categoriesStore = useCategoriesStore();
        const defineAmountConfig = {
            masked: false,
            thousands: '',
            decimal: '.',
            precision: 0,
            disableNegative: false,
            disabled: false,
            min: 0,
            max: categoriesStore.$state.selectedProduct.admin_fee,
            allowBlank: false,
            minimumNumberOfCharacters: 0  
        }
        const defineAmountForm = reactive({
            discount: 0
        })
        const computedProfit = computed(() => {
            return categoriesStore.selectedProduct.admin_fee - defineAmountForm.discount
        })
        const defineAmountFormValidationRule = {
            discount: {
                maxValue: maxValue(categoriesStore.$state.selectedProduct.admin_fee)
            }
        }
        const isDefineAmountError = ref(false);
        const $v = useVuelidate(defineAmountFormValidationRule, defineAmountForm);
        const router = useRouter()
        useLastRoute().setLastRoute();
        const { tg, tgSetParamsToMainButton, showCloseMainButton, notificationOccurred } = useTelegram();
        const { backButton } = useBackButton()
        const { numberFormatterConfig } = useVMoney();
        const route = useRoute();
        showCloseMainButton();
        const addStream = () => {
            postAdminStream(streamsStore.streamForm)
                .then((response) => {
                    toastStore.showToastAsAlert({
                        message: "Stream qo'shildi",
                        delayTime: 1000,
                        type: "success"
                    })

                    router.push({name: "created-stream", params: { id: response.data.data.id }})
                })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        delayTime: 2000,
                        type: 'error'
                    })
                })
        }
        
        const setParams = () => {
            if(streamsStore.streamForm.name) {
                tgSetParamsToMainButton({
                    disabled: false,
                    text: "Oqim yaratish",
                    textColor: "#fff",
                    color: "#55BE61"
                })
            } else {
                tgSetParamsToMainButton({
                    disabled: true,
                    text: "Oqim yaratish",
                    textColor: "#8C8C8C",
                    color: "#E4E6E4"
                })
            }
        }

        onMounted(() => {
            streamsStore.$patch({
                streamForm: {
                    product_id: route.params.id
                }
            })
            tg.onEvent('mainButtonClicked', addStream)
            setParams()
            // categoriesStore.$state.
        })
        watch(defineAmountForm, (newValue) => {
            streamsStore.streamForm.discount = newValue.discount; 
            $v.value.$validate()
            .then(res => {
                if(!res) {
                    notificationOccurred('error')
                    isDefineAmountError.value = true;
                    tgSetParamsToMainButton({
                        disabled: true,
                        text: "Oqim yaratish",
                        textColor: "#8C8C8C",
                        color: "#E4E6E4"
                    })
                } else {
                    isDefineAmountError.value = false;
                    tgSetParamsToMainButton({
                        disabled: true,
                        text: "Oqim yaratish",
                        textColor: "#fff",
                        color: "#55BE61"
                    })
                    
                    }
                })
        }, {
            immediate: true
        })
        backButton(`/streams/create-stream/${streamsStore.$state.streamForm.product_id}`)
        onUnmounted(() => {
            tg.offEvent('mainButtonClicked', addStream)
        })
        return {
            streamsStore,
            numberFormatterConfig,
            defineAmountConfig,
            isDefineAmountError,
            defineAmountForm,
            categoriesStore,
            computedProfit
        }
    },
})
</script>
<style lang="scss" scoped>
.donation {
    position: relative;
    font-size: 1.5rem;
    font-weight: 400;
    height: 100vh;
    &-header {
        margin: .6rem 0;
        @include card-mixin;
        display: flex;
        align-items: center;
        gap: .8rem;
        padding: 1.2rem 1.6rem;
        i {
            padding: 1.7rem;
            background: $blue;
            color: $white;
            font-size: 2.8rem;
            border-radius: .8rem;
        }

        &__note {
            &--title {
                font-weight: 600;
                font-size: 1.4rem;
                margin-bottom: 1.4rem;
            }

            &--description {
                font-size: 1.3rem;
            }
        }
    }
    &-form {
        @include card-mixin;
        background: #C2D9E715;
        &__title {
            padding: 1.9rem  2.1rem .9rem;
            color: $blue;
            font-weight: 500;
            @include card-mixin;
        }

        &__form {
            display: inline-flex;
            align-items: center;
            justify-items: flex-start;
            // gap: 1rem;
            font-size: 3.6rem;
            padding: .8rem 1.6rem;
            &--input {
                font-weight: 600;
                flex: 1 1 auto;
                color: $black;
                font-size: inherit;
                padding: .3rem;
                // width: 16.5rem;
                border: none;
                outline: none;
                background: inherit;
            }
            & span:last-child {
                color: rgba($black, .5);
            }


        }
        
    }
    &-info {
        font-size: 1.2rem;
        font-weight: 400;
        padding: 1.2rem 1.6rem;
        color: $gray-variant;
    }
    &-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: $white;
        padding: 1.5rem 1.6rem;
        &__article {
            display: flex;
            align-items: center;
            gap: .8rem;
            i {
                background: $blue;
                color: $white;
                padding: 1rem;
                font-size: 1.7rem;
                border-radius: 50%;
            }
            &--title {
                color: $gray-variant;
                font-size: 1.3rem;
            }
            &--info {
                color: $black;
                font-weight: 500;
            }
        }
    }
}

</style>