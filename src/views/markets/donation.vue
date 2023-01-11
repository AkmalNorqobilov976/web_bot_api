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
                <input v-resizeable.size=".1" type="number" value="100" />
                <span> uzs</span>
            </form>
            <div class="donation-form__suggestions">
                <span class="donation-form__suggestions-item">
                    100 uzs
                </span>
                <span class="donation-form__suggestions-item">
                    300 uzs
                </span>
                <span class="donation-form__suggestions-item">
                    500 uzs
                </span>
            </div>
        </section>

        <p class="donation-info">
            Yuqorida kiritilgan summa ushbu oqim buyurtmasi yetkazib berilganda admin hisobidan ushlab qolinadi. Yig'ilgan mablag'ni bosh sahifadagi “hayriya qutisi” sahifasidan  kuzatishingiz mumkin.
        </p>
    </main>
</template>

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
            input {
                font-weight: 600;
                font-size: inherit;
                width: 2*3rem;
                border: none;
                outline: none;
                background: inherit;
            }
            span {
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