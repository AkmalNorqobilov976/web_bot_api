<template>
    <main class="market-preview d-grid-max-content">
        <div class="market-preview__cards">
            <market-card 
                v-for="(product, i) in categoriesStore.$state.products" 
                :key="i" 
                :cardData="product"
            />
        </div>
        <message-not-found v-if="!categoriesStore.$state.products.length"/>
    </main>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import MessageNotFound from '@/components/MessageNotFound.vue';
import { useLastRoute } from '@/composables/useLastRoute';
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import { defineComponent } from 'vue-demi'
export default defineComponent({
    setup() {
        const categoriesStore = useCategoriesStore();
        useLastRoute().setLastRoute();
        return {
            categoriesStore
        }
    },
    components: { MarketCard, MessageNotFound },
})
</script>

<style lang="scss" scoped>

</style>