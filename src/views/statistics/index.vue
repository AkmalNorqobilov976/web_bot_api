<template>
    <div class="position-relative">
        <tabs class="position-sticky top-0" :tabs="tabs"/>
        <router-view/>
    </div>
</template>


<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton';
import { ref } from 'vue-demi';
export default {
    setup() {
        const good = ref("good")
        const { backButton } = useBackButton()
        backButton()

        return {
            good
        }
    },
    data: () => ({
        tabs: [
            {
                to: "/statistics",
                text: "Barchasi"
            },
            {
                to: "/statistics/new",
                text: "Yangilar"
            },
            {
                to: "/statistics/ready",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/statistics/active",
                text: "Yetkazilmoqda"
            },
            {
                to: "/statistics/deliveried",
                text: "Yetkazib berildi"
            },
            {
                to: "/statistics/cancelled",
                text: "Qaytib keldi"
            },
            {
                to: "/statistics/not-necessary",
                text: "Keyin oladi"
            },
            {
                to: "/statistics/archive",
                text: "Arxiv"
            },
            {
                to: "/statistics/spam",
                text: "Spam"
            },
        ]
    }),
    components: {
        Tabs,
    } 
}
</script>
