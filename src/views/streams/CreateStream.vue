<template>
    <market-card :cardData="categoriesStore.$state.selectedProduct" :isShowBtn="false"/>
    
    <section class="stream-name">
        <form @submit.prevent="">
            <label class="stream-name__title">Oqim nomi</label>
            <!-- error-input class -->
            <tooltip style="bottom: -2.2rem;" :label="labelMessage"> 
                <template #tooltip>
                    <input 
                        v-model="streamsStore.$state.streamForm.name"
                        class="stream-name__input"  
                        type="text"
                        :class="{'error-input': labelMessage}" 
                        placeholder="Misol uchun: 1-oqim linki" 
                    />
                </template>

            </tooltip>
        </form>
    </section>

    <section class="addition-stream-info">
        <header class="addition-stream-info__header">
            <p class="addition-stream-info__header--title">
                Qo‘shimcha
            </p>
        </header>
        <!-- product id, stream,  -->
        <main class="addition-stream-info__main">
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'donation'})">
                Xayriyaga pul ajratish <i class="ri-arrow-right-s-line"></i>
            </div>
            <div class="addition-stream-info__main--list" @click="$router.push({name: 'define-amount'})">
                Maxsulotga chegirma qo‘yish <i class="ri-arrow-right-s-line"></i>
            </div>
        </main>
    </section>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import Tooltip from '@/components/Tooltip.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import { onMounted, onUnmounted, ref, watch } from 'vue-demi'
import { useTelegram } from '@/composables/useTelegram'
import { useRoute, useRouter } from 'vue-router'
import { useStreamsStore } from '@/store/server/useStreamsStore'
import { postAdminStream } from '@/api/advertiserApi'
import { useToastStore } from '@/store/useToastStore'
import { useLastRoute } from '@/composables/useLastRoute'
export default {
    components: { MarketCard, Tooltip },
    setup() {
        const { backButton } = useBackButton()
        backButton('/markets/preview/all')
        const categoriesStore = useCategoriesStore();
        const streamsStore = useStreamsStore();
        const { tg, showMainButton, hideMainButton, tgSetParamsToMainButton} = useTelegram();
        const route = useRoute();
        const router = useRouter();
        const labelMessage = ref('')
        const toastStore = useToastStore();
        useLastRoute().setLastRoute();
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

        const addStream = () => {
            postAdminStream(streamsStore.streamForm)
                .then((response) => {
                    toastStore.showToastAsAlert({
                        message: "Stream qo'shildi",
                        delayTime: 1000,
                        type: "success"
                    })

                    router.push({name: "created-stream", params: { id: response.data.data.id }})
                })
                .catch(error => {
                    labelMessage.value = error.response.data.message; 
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        delayTime: 2000,
                        type: 'error'
                    })
                })
        }
        onMounted(() => {
            showMainButton();
            streamsStore.$patch({
                streamForm: {
                    product_id: route.params.id
                }
            })
            tg.onEvent('mainButtonClicked', addStream)
            setParams(streamsStore.$state.streamForm.name)
            // categoriesStore.$state.
        })
        watch(streamsStore, () => {
            setParams()
        })


        onUnmounted(() => {
            hideMainButton();
            tg.offEvent('mainButtonClicked', addStream);
        })
        return {
            categoriesStore,
            labelMessage,
            streamsStore
        }
    },
}
</script>

<style lang="scss" scoped>
    .stream-name {
        margin-bottom: .8rem;
        font-weight: 400;
        font-size: 1.5rem;
        @include card-mixin;
        padding: .9rem 2.1rem;
        &__title {
            color: $blue;
            font-weight: 500;
            display: block;
            padding: .9rem 0;
        }

        &__input {
            width: 100%;
            padding: 1rem 2rem;
            border-radius: 1rem;
            border: none;
            font-size: 1.5rem;
            outline: none;
            background: rgba($color: #C2D9E7, $alpha: .15);
            &::placeholder {
                color: rgba(0, 0, 0, 0.45);
            }

        }
    }

    .addition-stream-info {
        font-size: 1.5rem;
        padding: 1rem 0;
        @include card-mixin;
        &__header {
            p {
                font-weight: 500;
                color: $blue;
                padding: .9rem 2.1rem;
            }
        }

        &__main {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            &--list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2.1rem;
            }
        }
    }

    .error-input {
        color: #ED5974;
        background: rgba($color: #ED5974, $alpha: .2);
    }
</style>