<template>
    <main class="donation">
        <header class="donation-header">
            <i class="ri-hand-coin-line"></i>
            <article class="donation-header__note">
                <p class="donation-header__note--title"> Diqqat eslatma! </p>
                <div class="donation-header__note--description">
                    Hayriyaga ajratiladigan summa har bir buyurtmadan 5.000 UZS gacha olinadi
                </div>
            </article>
        </header>

        <section class="donation-form">
            <p class="donation-form__title">Summani yozing</p>
            <form @submit.prevent class="donation-form__form">
                <input 
                    class="donation-form__form--input" 
                    v-model="donationForm.charity"
                    v-resizable
                    placeholder="10,000"
                    v-money3="donationConfig"
                    :class="{'shake error-text': isDonationError}"
                    />
                <span>uzs</span>
            </form>
            <div class="donation-form__suggestions">
                <span @click="donationForm.charity = 1000" class="donation-form__suggestions-item">
                    1000 uzs
                </span>
                <span @click="donationForm.charity = 3000" class="donation-form__suggestions-item">
                    3000 uzs
                </span>
                <span @click="donationForm.charity = 5000" class="donation-form__suggestions-item">
                    5000 uzs
                </span>
            </div>
        </section>

        <p class="donation-info">
            Yuqorida kiritilgan summa ushbu oqim buyurtmasi yetkazib berilganda admin hisobidan ushlab qolinadi. Yig'ilgan mablag'ni bosh sahifadagi “hayriya qutisi” sahifasidan  kuzatishingiz mumkin.
        </p>
    </main>
</template>
<script>
import { postAdminStream } from '@/api/advertiserApi';
import { useBackButton } from '@/composables/useBackButton'
import { useLastRoute } from '@/composables/useLastRoute';
import { useTelegram } from '@/composables/useTelegram';
import { useCategoriesStore } from '@/store/server/useCategoriesStore';
import { useStreamsStore } from '@/store/server/useStreamsStore';
import { useToastStore } from '@/store/useToastStore';
import { useVuelidate } from '@vuelidate/core';
import { maxLength, maxValue } from '@vuelidate/validators';
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent ({
    props: {

    },
    setup() {
        const streamsStore = useStreamsStore();
        const toastStore = useToastStore();
        useLastRoute().setLastRoute();
        const categoriesStore = useCategoriesStore();
        const donationConfig = {
            masked: false,
            thousands: '',
            decimal: '.',
            precision: 0,
            disableNegative: false,
            disabled: false,
            min: 0,
            max: 5000,
            allowBlank: false,
            minimumNumberOfCharacters: 0  
        }
        
        const router = useRouter();
        const { tg, showMainButton, hideMainButton, tgSetParamsToMainButton, notificationOccurred } = useTelegram()
        const { backButton } = useBackButton()
        const route = useRoute();
     
        const donationForm = reactive({
            charity: 0
        });
        const donationFormValidationRule = {
            charity: {
                maxValue: maxValue(5000)
            }
        }
        const isDonationError = ref(false)
        const $validation = useVuelidate(donationFormValidationRule, donationForm);
        backButton(`/streams/create-stream/${streamsStore.$state.streamForm.product_id}`)
        const updateStream = () => {
            streamsStore.updateStream(streamsStore.stream)
                .then(() => {
                    toastStore.showToastAsAlert({
                        message: "Yangilandi!",
                        type: "success",
                        delayTime: 3000
                    })
                })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 3000
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
        onMounted(() => {
            showMainButton();
            streamsStore.$patch({
                streamForm: {
                    product_id: route.params.id
                }
            })
            setParams()
            tg.onEvent('mainButtonClicked', addStream)
            // categoriesStore.$state.
        })
        watch(donationForm, (newValue) => {
            streamsStore.streamForm.charity = newValue.charity;
            $validation.value.$validate()
                .then(res => {
                    if(!res) {
                        isDonationError.value = !res;
                        notificationOccurred('error')
                        tgSetParamsToMainButton({
                            disabled: false,
                            text: "Oqim yaratish",
                            textColor: "#fff",
                            color: "#55BE61"
                        })
                    } else {
                        isDonationError.value = false;
                        setParams();
                    } 
                })
        }, {
            immediate: true
        })
        const inputForm = (e, key) => {
            streamsStore.$state.streamForm[key] = e.target.innerText
        }
        onUnmounted(() => {
            hideMainButton();
            tg.offEvent('mainButtonClicked', addStream)
        })
        return {
            inputForm,
            streamsStore,
            donationConfig,
            donationForm,
            $validation,
            isDonationError
        }
    },
})
</script>
<style lang="scss" scoped>
.donation {
    font-size: 1.5rem;
    font-weight: 400;
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
                font-size: inherit;
                border: none;
                outline: none;
                background: inherit;
            }
            & span:last-child {
                color: $gray;
            }


        }
        
        &__suggestions {
            display: flex;
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
    &-info {
        font-size: 1.2rem;
        font-weight: 400;
        padding: 1.2rem 1.6rem;
        color: $gray-variant;
    }
}
</style>