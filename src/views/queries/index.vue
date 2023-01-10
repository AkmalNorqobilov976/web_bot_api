<template>
    <tabs :tabs="tabs"/>
    <main>
        <router-view/>
    </main>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
export default {
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