<template>
    <market-card :cardData="categoriesStore.$state.selectedProduct" :isShowBtn="false"/>
    
    <section class="stream-name">
        <form @submit.prevent="">
            <label class="stream-name__title">Oqim nomi</label>
            <!-- error-input class -->
            <input class="stream-name__input" placeholder="Misol uchun: 1-oqim linki" />
            <tooltip style="bottom: -2.2rem;" label="Bu nomdagi Oqim linki mavjud"/>
        </form>
    </section>

    <section class="addition-stream-info">
        <header class="addition-stream-info__header">
            <p class="addition-stream-info__header--title">
                Qo‘shimcha
            </p>
        </header>
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
export default {
  components: { MarketCard, Tooltip },
    setup() {
        const { backButton } = useBackButton()
        const categoriesStore = useCategoriesStore();
        backButton('/markets/preview/all')
        return {
            categoriesStore
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
            outline: none;
            background: #C2D9E7;
            &::placeholder {
                color: rgba(0, 0, 0, 0.45);
            }


            &:focus {
                
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

</style>