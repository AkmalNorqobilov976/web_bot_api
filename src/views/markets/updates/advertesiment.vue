<template>
    <main v-if="streamsStore.$state.stream" class="donation">
        <header class="donation-header">
            <i class="ri-file-list-3-line"></i>
            <article class="donation-header__note">
                <p class="donation-header__note--title"> Diqqat eslatma! </p>
                <div class="donation-header__note--description">
                    Reklama summasi sizning oqim havolangizga ulangan holda hisoblanadi
                </div>
            </article>
        </header>

        <section class="donation-form">
            <p class="donation-form__title">Summa</p>
            <form @submit.prevent class="donation-form__form">
                <input 
                    class="donation-form__form--input"
                    v-model="donationForm.sum"
                    v-resizable
                    v-money3="numberFormatterConfig"
                />
                <span> uzs</span>
            </form>
        </section>

        <p class="donation-info">
            Ushbu summani o‘zingiz xohishingizga qarab kiritasiz va oqimdagi mahsulot reklamasi uchun qancha ajratgan bo‘lsangiz shu summani kiritishingiz bilan uning statistikasini ko‘rishingiz mumkun
        </p>
    </main>
</template>
<script>
import { useBackButton } from '@/composables/useBackButton'
import { useTelegram } from '@/composables/useTelegram';
import { useVMoney } from '@/composables/useVMoney';
import { useStreamsStore } from '@/store/server/useStreamsStore'
import { useToastStore } from '@/store/useToastStore';
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue'
export default defineComponent ({
    props: {

    },
    setup() {
        const streamsStore = useStreamsStore();
        const { tg, showMainButton, hideMainButton } = useTelegram();
        const donationForm = reactive({
            sum: "1000,000"
        })
        const { backButton } = useBackButton()
        const { numberFormatterConfig } = useVMoney()
        const toastStore = useToastStore();
        backButton()

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

        onMounted(() => {
            showMainButton();
            tg.onEvent('mainButtonClicked', updateStream)
        })

        onUnmounted(() => {
            tg.offEvent('mainButtonClicked', updateStream)
            hideMainButton();
        })
        return {
            donationForm,
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
    }
    &-info {
        font-size: 1.2rem;
        font-weight: 400;
        padding: 1.2rem 1.6rem;
        color: $gray-variant;
    }
}
</style>