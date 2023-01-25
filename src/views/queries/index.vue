<template>
    <tabs :tabs="tabs"/>
    <main>
        <router-view/>
    </main>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
export default {
    setup() {
        const { backButton } = useBackButton()
        backButton()
    },
    data: () => ({
        tabs: [
            {
                to: "/orders",
                text: "Barchasi"
            },
            {
                to: "/orders/new",
                text: "Yangilar"
            },
            {
                to: "/orders/ready",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/orders/active",
                text: "Yetkazilmoqda"
            },
            {
                to: "/orders/deliveried",
                text: "Yetkazib berildi"
            },
            {
                to: "/orders/cancelled",
                text: "Qaytib keldi"
            },
            {
                to: "/orders/not-necessary",
                text: "Keyin oladi"
            },
            {
                to: "/orders/archive",
                text: "Arxiv"
            },
            {
                to: "/orders/spam",
                text: "Spam"
            },
            /**
             * Barchasi
Yetkazib berildi
Qaytib keldi
Keyin oladi
Arxiv
Spam
             */
            // {
            //     to: "/completed",
            //     text: "Yetkazishga tayyor"
            // }
        ]
    }),
    components: {
        Tabs
    } 
}
</script>
    