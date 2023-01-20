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
                to: "/queries",
                text: "Barchasi"
            },
            {
                to: "/queries/new",
                text: "Yangilar"
            },
            {
                to: "/queries/ready",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/queries/active",
                text: "Yetkazilmoqda"
            },
            {
                to: "/queries/deliveried",
                text: "Yetkazib berildi"
            },
            {
                to: "/queries/cancelled",
                text: "Qaytib keldi"
            },
            {
                to: "/queries/not-necessary",
                text: "Keyin oladi"
            },
            {
                to: "/queries/archive",
                text: "Arxiv"
            },
            {
                to: "/queries/spam",
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
    