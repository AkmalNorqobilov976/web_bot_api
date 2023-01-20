<template>
    <main class="donation">
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
                <span class="donation-form__form--input" @input="inputForm($event, 'sum')" contenteditable>{{donationForm.sum}}</span>
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
import { defineComponent, reactive } from 'vue'
export default defineComponent ({
    props: {

    },
    setup() {
        const donationForm = reactive({
            sum: "1000,000"
        })
        const { backButton } = useBackButton()
        backButton()

        const inputForm = (e, key) => {
            donationForm[key] = e.target.innerText
        }
        return {
            donationForm,
            inputForm
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