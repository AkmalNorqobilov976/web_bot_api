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
                    v-model="streamsStore.$state.streamForm.charity"
                    v-resizable
                    v-money3="numberFormatterConfig"
                />
                <span>uzs</span>
            </form>
            <div class="donation-form__suggestions">
                <span @click="streamsStore.$state.streamForm.charity = 100" class="donation-form__suggestions-item">
                    100 uzs
                </span>
                <span @click="streamsStore.$state.streamForm.charity = 300" class="donation-form__suggestions-item">
                    300 uzs
                </span>
                <span @click="streamsStore.$state.streamForm.charity = 500" class="donation-form__suggestions-item">
                    500 uzs
                </span>
            </div>
        </section>

        <p class="donation-info">
            Yuqorida kiritilgan summa ushbu oqim buyurtmasi yetkazib berilganda admin hisobidan ushlab qolinadi. Yig'ilgan mablag'ni bosh sahifadagi “hayriya qutisi” sahifasidan  kuzatishingiz mumkin.
        </p>
    </main>
</template>
<script>
import { useBackButton } from '@/composables/useBackButton'
import { useTelegram } from '@/composables/useTelegram';
import { useVMoney } from '@/composables/useVMoney';
import { useStreamsStore } from '@/store/server/useStreamsStore';
import { useToastStore } from '@/store/useToastStore';
import { defineComponent, onMounted, onUnmounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router';
export default defineComponent ({
    props: {

    },
    setup() {
        const streamsStore = useStreamsStore();
        const toastStore = useToastStore();
        const { numberFormatterConfig } = useVMoney();
        const { tg, showMainButton, hideMainButton, tgSetParamsToMainButton } = useTelegram()
        const { backButton } = useBackButton()
        const route = useRoute();
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

        onMounted(() => {
            showMainButton();
            streamsStore.$patch({
                streamForm: {
                    product_id: route.params.id
                }
            })
            setParams()
             tg.onEvent('mainButtonClicked', updateStream)
            // categoriesStore.$state.
        })
        watch(streamsStore, () => {
            setParams()
        })
        const inputForm = (e, key) => {
            streamsStore.$state.streamForm[key] = e.target.innerText
        }
        onUnmounted(() => {
            hideMainButton();
            tg.offEvent('mainButtonClicked', updateStream)
        })
        return {
            inputForm,
            streamsStore,
            numberFormatterConfig
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