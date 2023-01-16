<template>
    <main class="my-profile">
        <header class="my-profile__header">
            <div class="my-profile__header--photo">
                <img v-if="isImage" src="" alt="">
                <i v-else class="ri-user-6-fill"></i>
            </div>
            <p class="my-profile__header--name">Javohir Ganiyev</p>
        </header>

         <div class="my-profile__btn-grp">
            <div class="my-profile__btn-grp--btn">
                <div class="my-profile__btn-grp--btn--1">
                    <span>
                        <i class="ri-link-m"></i>
                    </span>
                    329
                </div>
            </div>
            <div class="my-profile__btn-grp--btn">
                <div class="my-profile__btn-grp--btn--2">
                    <i class="ri-file-list-fill"></i>
                    77709
                </div>
            </div>
        </div>

        <section class="my-profile__form">
            <p 
                class="my-profile__form--title"
            >Ma’lumotlarni o‘zgartirish</p>
            <form @submit.prevent>
                <under-line-input 
                    label="Ismingiz" 
                    v-model="userInfo.username"
                />
            </form>
        </section>
    </main>
</template>


<script>
import { defineComponent, reactive, ref } from 'vue'
import UnderLineInput from '@/components/Form/inputs/UnderLineInput.vue'
export default {
    setup() {
        const isImage = ref(false)
        const userInfo = reactive({
            username: ""
        })
        defineComponent({
            components: {
                UnderLineInput
            }
        })
        return {
            isImage
        }
    },
}
</script>
<style lang="scss" scoped>
    .my-profile {
        &__header {
            padding: 1.2rem 0;
            text-align: center;
            @include card-mixin;
            &--photo {
                margin: auto;
                width: 6.7rem;
                height: 6.7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border: .1rem solid $blue;
                border-radius: 50%;
                background: rgba($color: $blue, $alpha: .2);
                font-size: 3.3rem;
                color: $blue;
            }

            &--name {
                margin-top: .8rem;
                color: $black;
                font-size: 1.5rem;
                font-weight: 400;
            }
        }
        &__btn-grp {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            @include card-mixin;
            padding: .6rem 1.6rem;
            margin-top: .8rem;

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
                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: .64rem;
                        border-radius: 50%;
                        background: $black;
                        i {
                            color: $white;
                        }
                    }
                }

                &--2 {
                    color: $blue;
                    i {
                        font-size: 2.5rem;
                    }
                }
            }

        }

        &__form {
            @include card-mixin;
            margin-top: .8rem;
            padding: 1.2rem 1.6rem;
            &--title {
                padding: .9rem .5rem;
                color: $blue;
                font-size: 1.5rem;
                font-weight: 500;
                
            }
        }
    }
</style>