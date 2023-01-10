<template>
    <market-card :isShowBtn="false"/>

    <section class="stream-name">
        <p class="stream-name__title">Oqim nomi</p>
        <p class="stream-name__value"></p>
    </section>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
export default {
  components: { MarketCard },
    setup() {
        
    },
}
</script>