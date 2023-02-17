<template>
    <div class="d-grid-max-content">
       <div ref="scrollComponent">
           <query-list-card v-for="(order, i) in $lodashGet(ordersStore, '$state.orders')" :key="i" :listData="order"/>
           <div ref="intersectionTrigger" style="height: 10px; background: transparent;"> 
                <Loading v-if="ordersStore.page !=1 && ordersStore.loading"/>
            </div>
       </div>
       <message-not-found v-if="!$lodashGet(ordersStore, '$state.orders', '').length"/>
  </div>

</template>

<script>
import { defineComponent,ref, onMounted, onUnmounted, watch } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
import { useOrdersStore } from "@/store/server/useOrdersStore";
import MessageNotFound from "@/components/MessageNotFound.vue";
import { useRoute } from "vue-router";
import { useToastStore } from "@/store/useToastStore";
import { makeUseInfiniteScroll } from "vue-use-infinite-scroll";
import Loading from "@/components/Loading.vue";

export default defineComponent({
   components: {
    QueryListCard,
    MessageNotFound,
    Loading
},
   setup() {
       const ordersStore = useOrdersStore();
       const scrollComponent = ref(null);
       const route = useRoute();
       const toastStore = useToastStore();
       const intersectionTrigger = ref(null)
        const useInfiniteScroll = makeUseInfiniteScroll({});
        const pageRef = useInfiniteScroll(intersectionTrigger);
       const getOrders = () => {
            let routeParams = route.path.split('/')
            let status = routeParams[2] ? routeParams[routeParams.length-1] : ''
            ordersStore.getOrders({ status: status })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    });
                })
        }

        watch(pageRef, () => {
            getOrders();
        })
      
       return {
           ordersStore,
           scrollComponent,
           intersectionTrigger
       }
   }
})
</script>