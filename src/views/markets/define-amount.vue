<template>
    <main class="donation">
        <header class="donation-header">
            <i class="ri-percent-line"></i>
            <article class="donation-header__note">
                <p class="donation-header__note--title"> Diqqat eslatma! </p>
                <div class="donation-header__note--description">
                    Mahsulotga beriladigan chegirma birinchi mahsulotga 40.000 UZS gacha beriladi
                </div>
            </article>
        </header>

        <section class="donation-form">
            <p class="donation-form__title">Summani yozing</p>
            <form @submit.prevent class="donation-form__form">
                <span class="donation-form__form--input" @input="inputForm($event, 'discount')" contenteditable>{{ streamsStore.$state.streamForm.discount }}</span>
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
                    <p class="donation-footer__article--info">365.000 so‘m</p>
                </div>
            </article>
        </footer>
    </main>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { useStreamsStore } from '@/store/server/useStreamsStore';
import { defineComponent } from 'vue'
export default defineComponent ({
    setup() {
         const streamsStore = useStreamsStore();

        const { backButton } = useBackButton()
        const inputForm = (e, key) => {
            streamsStore.$state.streamForm[key] = e.target.innerText
        }
        backButton(`/streams/create-stream/${streamsStore.$state.streamForm.product_id}`)

        return {
            inputForm,
            streamsStore
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
                color: $red;
                font-size: inherit;
                padding: .3rem;
                // width: 16.5rem;
                border: none;
                outline: none;
                background: inherit;
            }
            & span:last-child {
                color: rgba($red, .5);
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