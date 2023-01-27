<template>
    <main>
        <market-card 
            v-for="(product, i) in categoriesStore.$state.products" 
            :key="i" 
            :cardData="product"
        />
    </main>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import { defineComponent } from 'vue-demi'
export default defineComponent({
    setup() {
        const categoriesStore = useCategoriesStore();

        return {
            categoriesStore
        }
    },
    components: { MarketCard },
})
</script>