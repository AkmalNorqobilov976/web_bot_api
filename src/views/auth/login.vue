<template>
    <div class="login">
        <p class="login__title">Tizimga kirish</p>
        <form @submit.prevent class="login__form">
            <div class="login__form--phone">
                <i class="ri-phone-fill"></i>
                <input 
                    class="login__form--phone--input" 
                    type="text" 
                    v-model="userInfo.phone"
                />
            </div>
            
            <div class="login__form--is-agree">
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
            <div class="login__form--code">
                <i class="ri-message-2-fill"></i>
                <input 
                    class="login__form--code--input" 
                    type="text" 
                    v-model="userInfo.code"
                />
                <span class="login__form--code--btn">Qayta yuborish</span>
            </div>

            <button 
                class="login__form--submit-btn"
            >Kirish</button>
        </form>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup() {
        const userInfo = reactive({
            phone: "+998 94 000-23-12",
            isAgree: false,
            code: "467"
        });

        return {
            userInfo
        }
    },
}
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
        background: rgba($color: $blue, $alpha: .15);
    }
    .login {
        @include card-mixin;
        padding: 2rem 1.6rem;
        font-weight: 500;

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
                &--input {
                    flex: 1 1 auto;
                    font-size: 1.5rem;
                    background: transparent;
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

            &--code {
                @include input-wrapper;

                input {
                    flex: 1 1 auto;
                    background: transparent;
                }

                &--btn {
                    color: $blue;
                    font-size: 1.3rem;
                    cursor: pointer;
                }
            }

            &--submit-btn {
                width: 100%;
                @include btn-mixin;
                padding: 1.6rem 0;
                color: $white;
                margin-top: 1.8rem;
                background: $blue;

            }
        }
    }
</style>