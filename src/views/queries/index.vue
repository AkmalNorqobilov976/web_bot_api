<template>
    <tabs :tabs="tabs"/>
    <main>
        <router-view/>
    </main>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useOrdersStore } from '@/store/server/useOrdersStore'
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { useToastStore } from '@/store/useToastStore';
import { useLastRoute } from '@/composables/useLastRoute';
export default {
    setup() {
        const { backButton } = useBackButton();
        const route = useRoute();
        const ordersStore = useOrdersStore();
        const toastStore = useToastStore();
        backButton('/')
        useLastRoute().setLastRoute();
        const getOrders = () => {
            let routeParams = route.path.split('/')
            let status = routeParams[2] ? routeParams[routeParams.length-1] : ''
            console.log(route.path.split('/'), "path");
            ordersStore.getOrders({ status: status })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    });
                })
        }
        watch(route, (newValue) => {
            ordersStore.$patch({
                page: 1
            })
            getOrders();
        }, {
            immediate: true,
            deep: true
        })

        return {
            ordersStore
        }
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
                to: "/orders/accepted",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/orders/sent",
                text: "Yetkazilmoqda"
            },
            {
                to: "/orders/delivered",
                text: "Yetkazib berildi"
            },
            {
                to: "/orders/canceled",
                text: "Qaytib keldi"
            },
            {
                to: "/orders/hold",
                text: "Keyin oladi"
            },
            {
                to: "/orders/archived",
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
    