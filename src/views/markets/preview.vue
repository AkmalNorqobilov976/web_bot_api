<template>
    <main>
        {{ categoriesStore.$state.products }}
        <market-card 
            v-for="(product, i) in categoriesStore.$state.products" 
            :key="i" 
            :cardData="product"
        />
        <market-card/>
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