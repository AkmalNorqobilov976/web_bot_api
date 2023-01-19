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
                to: "/statistics/preview/visited",
                text: "Tashriflar"
            },
            {
                to: "/statistics/preview/new",
                text: "Yangi"
            },
            {
                to: "/statistics/preview/recall",
                text: "Qayta qo‘ng’iroq"
            },
            {
                to: "/statistics/preview/in-way",
                text: "Yo‘lda"
            },
            {
                to: "/statistics/preview/accepted",
                text: "Qabul qilingan"
            },
            {
                to: "/statistics/preview/spam",
                text: "Spam"
            },
            {
                to: "/statistics/preview/rejected",
                text: "Qaytib keldi"
            },
            {
                to: "/statistics/preview/archived",
                text: "Arxivlandi"
            },
        ]
    }),
    components: {
        Tabs
    } 
}
</script>

