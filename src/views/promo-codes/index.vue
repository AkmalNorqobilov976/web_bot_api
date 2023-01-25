<template>
    <div class="customers">
        <article v-for="(item, i) in promoCodesStore.$state.promoCodes" :key="i" class="promo-cod">
            <nav class="promo-cod__navbar">
                <div class="promo-cod__navbar--i1">
                    <i class="ri-coupon-3-fill"></i> G4OFD
                </div>
                <div class="promo-cod__navbar--button">
                    <button :style="{background: navbarButtons[item.type].color }">{{ navbarButtons[item.type].text }}</button>
                    <!-- <button>O‘chirilgan</button> -->
                </div>
            </nav>
            <main class="promo-cod__main">
                <div class="promo-cod__main--list">
                    <div>Tashriflar</div>
                    <div>{{item.views}}</div>
                </div>
                <div class="promo-cod__main--list">
                    <div>O‘rnatishlar</div>
                    <div>{{item.installs}}</div>
                </div>
                <div class="promo-cod__main--list">
                    <div>Mahsulot ko‘rishlar soni</div>
                    <div>{{item.products}}</div>
                </div>
                <div class="promo-cod__main--list">
                    <div>Buyurtmalar</div>
                    <div>{{item.orders ? item.orders : 0 }}</div>
                </div>
            </main>
        </article>
    </div>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { onMounted, watchEffect  } from '@vue/runtime-core';
import { useTelegram } from '@/composables/useTelegram';
import { useRouter } from 'vue-router';
import { usePromoCodesStore } from '@/store/server/usePromoCodesStore';
export default {
    setup() {
        const router = useRouter()
        const navbarButtons = {
            archived: {
                color: "#F1A30C",
                text: "O'chirilgan" //archieved
            },
            others: {
                color: "#D60A0A",
                text: "Yakunlangan" //
            },
            delivered: {
                color: "#23B60B",
                text: "Yoqilgan" //delivered
            },
        };
        const { tg } = useTelegram()
        const { backButton } = useBackButton()
        const promoCodesStore = usePromoCodesStore()
        backButton();

        onMounted(() => {
            promoCodesStore.getPromoCodes()
        })
        watchEffect(() => {
            tg.MainButton.setParams({
                text: "Promo-kod yaratish",
                color: "#55BE61"
            })
            tg.MainButton.show()

            tg.MainButton.onClick(() => {
                tg.MainButton.hide()
                router.push({name: 'generate-promocode'})
            })
            
        })
        return {
            navbarButtons,
            promoCodesStore
        }
    },
}
</script>

<style lang="scss" scoped>
    .customers {
        .promo-cod {
            @include card-mixin;
            margin-bottom: .8rem;
            &__navbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.4rem 1.6rem;
                &--i1 {
                    i {
                        padding: .95rem;
                        background: #F2F2F2;
                        border-radius: 50%;
                        margin-right: 1.667rem;
                        color: $blue;
                    }
                    font-weight: 500;
                    font-size: 1.6rem;
                }

                &--button {
                    button {
                        outline: none;
                        font-weight: 400;
                        font-size: 1.4rem;
                        padding: .5rem .7rem;
                        border: none;
                        background: $green;
                        border-radius: .5rem;
                        color: $white;
                    }
                }
            }

            &__main {
                &--list {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem 2rem;
                    font-weight: 400;
                    font-size: 1.5rem;
                    & div:first-child {
                        font-weight: 400;
                        color: $gray;
                    }
                }
            }
        }
    }
</style>