<template>
   <div class="position-relative">
        <form>
            <div class="market-search-form">
                <i class="ri-search-line"></i>
                <input class="market-search-form__input" type="search" placeholder="Search sticker sets">
            </div>
        </form>
        <tabs  :tabs="tabs"/>
        <main>
            <market-card/>
            <market-card/>
        </main>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import MarketCard from '@/components/markets/MarketCard.vue';
export default {
    data: () => ({
        tabs: [
            {
                to: "/markets",
                text: "Barchasi"
            },
            {
                to: "/markets/new",
                text: "Yangi"
            },
            // {
            //     to: "/completed",
            //     text: "Yetkazishga tayyor"
            // }
        ]
    }),
    components: {
        Tabs,
        MarketCard
    } 
}
</script>

<style lang="scss" scoped>
    .market-search-form {
        display: flex;
        color: $gray;
        gap: 1.17rem;
        font-size: 1.6rem;
        align-items: center;
        padding: 1.07rem 1.97rem;
        &__input {
            flex-grow: 1;
            border: none;
            outline: none;
            background: $bg-color;
        }

    }
</style>