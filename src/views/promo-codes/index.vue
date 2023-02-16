<template>
    <div class="customers d-grid-max-content">
       <div ref="scrollComponent">
             <article 
                v-for="(item, i) in $lodashGet(promoCodesStore, '$state.promoCodes')" 
                :key="i" 
                class="promo-cod"
                @click="$router.push({name: 'generated-promocode', params: { id: $lodashGet(item, 'id')}})"
            >
                <nav class="promo-cod__navbar">
                    <div class="promo-cod__navbar--i1">
                        <i class="ri-coupon-3-fill"></i> {{ $lodashGet(item, 'code') }}
                    </div>
                    <div class="promo-cod__navbar--button">
                        <button :style="{background: $lodashGet(navbarButtons[item.type], 'color') }">{{ $lodashGet(navbarButtons[item.type], 'text') }}</button>
                    </div>
                </nav>
                <main class="promo-cod__main">
                    <div class="promo-cod__main--list">
                        <div>Tashriflar</div>
                        <div>{{$lodashGet(item, 'views')}}</div>
                    </div>
                    <div class="promo-cod__main--list">
                        <div>O‘rnatishlar</div>
                        <div>{{$lodashGet(item, 'installs')}}</div>
                    </div>
                    <div class="promo-cod__main--list">
                        <div>Mahsulot ko‘rishlar soni</div>
                        <div>{{$lodashGet(item, 'products')}}</div>
                    </div>
                    <div class="promo-cod__main--list">
                        <div>Buyurtmalar</div>
                        <div>{{ $lodashGet(item, 'orders', 0) }}</div>
                    </div>
                </main>
            </article>
       </div>
       <message-not-found v-if="!$lodashGet(promoCodesStore, '$state.promoCodes', '').length"/>
    </div>
</template>

<script>
import { useBackButton } from '@/composables/useBackButton'
import { onMounted, onUnmounted, watchEffect, ref  } from '@vue/runtime-core';
import { useTelegram } from '@/composables/useTelegram';
import { useRouter } from 'vue-router';
import { usePromoCodesStore } from '@/store/server/usePromoCodesStore';
import { useToastStore } from '@/store/useToastStore';
import MessageNotFound from '@/components/MessageNotFound.vue';
import { useLastRoute } from '@/composables/useLastRoute';
export default {
  components: { MessageNotFound },
    setup() {
        const router = useRouter()
        const scrollComponent = ref(null);
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
        useLastRoute().setLastRoute();
        const { tg, tgSetParamsToMainButton, showCloseMainButton } = useTelegram()
        const { backButton } = useBackButton()
        const toastStore = useToastStore();
        const promoCodesStore = usePromoCodesStore()
        backButton('/');
        showCloseMainButton();
        const routerToGeneratePromocode = () => {
            router.push({name: 'generate-promocode'});
        }

        const getPromocodes = () => {
            promoCodesStore.getPromoCodes()
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }
        onMounted(() => {
           getPromocodes();
        })
        const watcher = watchEffect(() => {
            tgSetParamsToMainButton({
                text: "Promo-kod yaratish",
                textColor: "#ffffff",
                color: "#55BE61",
                disabled: false
            })
        })

        onMounted(() => {
            tg.onEvent('mainButtonClicked', routerToGeneratePromocode)
        })
        
        onUnmounted(() => {
            watcher();
            tg.offEvent('mainButtonClicked', routerToGeneratePromocode)
        })

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })
        const oldScrollY = ref(window.scrollY);
        const handleScroll = (e) => {
            let element = scrollComponent.value;
            if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 20 && oldScrollY.value < window.scrollY) {
                getPromocodes();
            }
            oldScrollY.value = window.scrollY
        }
        return {
            navbarButtons,
            promoCodesStore,
            scrollComponent
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