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
                text: "Yangi"
            },
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