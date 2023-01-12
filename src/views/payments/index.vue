<template>
    <div class="payment">
           <div class="payment__card-info">
            <div>
                <p class="payment__card-info--title">Hisobingizda</p>
                <p class="payment__card-info--balance">12.000.000 uzs</p>
                <p class="payment__card-info--guess-balance">
                    Taxminiy balans: <span>86.005.500 uzs</span>
                </p>
            </div>
            
            <div class="payment__btn-grp">
                <div class="payment__btn-grp--btn">
                    <div class="payment__btn-grp--btn--1">
                        <i class="ri-copper-diamond-fill"></i>
                        329
                    </div>
                </div>
                <div class="payment__btn-grp--btn">
                    <div class="payment__btn-grp--btn--2">
                        <i class="ri-file-list-fill"></i>
                        77709
                    </div>
                </div>
            </div>

        </div>
        <section class="payment-form">
            <p class="payment-form__title">Summani yozing</p>
            <form @submit.prevent class="payment-form__form">
                <input v-resizeable.size=".1" type="number" value="100" />
                <span> uzs</span>
            </form>
            <div class="payment-form__suggestions">
                <span class="payment-form__suggestions-item">
                    100 uzs
                </span>
                <span class="payment-form__suggestions-item">
                    300 uzs
                </span>
                <span class="payment-form__suggestions-item">
                    500 uzs
                </span>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .payment {
        &__card-info {
            @include card-mixin;
            padding: 2.5rem 1.6rem;
            font-weight: 400;
            font-size: 1.6rem;
            &--balance {
                font-size: 2.4rem;
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

            .payment-button-tab {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                margin-top: 2.5rem;
                gap: 1rem;
                font-size: 1rem;
                &__button {
                    background: $blue;
                    color: $white;
                    padding: .75rem 1rem;
                    text-align: center;
                    box-shadow: $button-box-shadow;
                    border-radius: .8rem;
                    i {
                        font-size: 1.67rem;

                    }
                    p {
                        margin-top: .775rem;
                    }
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
                }

                &--1 {
                    color: $black;
                }

                &--2 {
                    color: $blue;
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
    }
</style>