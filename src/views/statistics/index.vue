<template>
    <div class="position-relative">
        <tabs class="position-sticky top-0" :tabs="tabs"/>
        <preview/>
    </div>
</template>


<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton';
import { defineComponent, reactive, ref, watch } from 'vue-demi';
import { useRoute } from 'vue-router';
import { useStatisticsStore } from '@/store/server/useStatisticsStore'
import Preview from './preview.vue'
import { useToastStore } from '@/store/useToastStore';
import { useLastRoute } from '@/composables/useLastRoute';
export default defineComponent({
    setup() {
        const good = ref("")
        const { backButton } = useBackButton()
        const route = useRoute();
        const statisticsStore = useStatisticsStore();
        const toastStore = useToastStore();
        useLastRoute().setLastRoute();
        
        backButton('/')

        const getStatistics = () => {
            statisticsStore.getStatistics({ status: route.params.tab !== 'all' ? route.params.tab : '' })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }
        watch(route, () => {
            statisticsStore.$patch({
                page: 1
            })
            getStatistics();
        }, {
            immediate: true,
            deep: true
        })
        return {
            good
        }
    },
    data: () => ({
        // new,accepted,sent,delivered,pending,spam,archived
        tabs: [
            {
                to: "/statistics/preview/all",
                text: "Barchasi"
            },
            {
                to: "/statistics/preview/new",
                text: "Yangilar"
            },
            {
                to: "/statistics/preview/accepted",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/statistics/preview/sent",
                text: "Yetkazilmoqda"
            },
            {
                to: "/statistics/preview/delivered",
                text: "Yetkazib berildi"
            },
            {
                to: "/statistics/preview/pending",
                text: "Kutlayotgan"
            },
            // {
            //     to: "/statistics/preview/hold",
            //     text: "Keyin oladi"
            // },
            {
                to: "/statistics/preview/archived",
                text: "Arxiv"
            },
            {
                to: "/statistics/preview/spam",
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
        Tabs,
        Preview
    } 
})
</script>

