<template>
    <div class="d-grid-max-content">
       <div ref="scrollComponent">
           <query-list-card v-for="(order, i) in $lodashGet(ordersStore, '$state.orders')" :key="i" :listData="order"/>
       </div>
       <message-not-found v-if="!$lodashGet(ordersStore, '$state.orders', '').length"/>
  </div>

</template>

<script>
import { defineComponent,ref, onMounted, onUnmounted } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
import { useOrdersStore } from "@/store/server/useOrdersStore";
import MessageNotFound from "@/components/MessageNotFound.vue";
import { useRoute } from "vue-router";
import { useToastStore } from "@/store/useToastStore";
export default defineComponent({
   components: {
       QueryListCard,
       MessageNotFound
   },
   setup() {
       const ordersStore = useOrdersStore();
       const scrollComponent = ref(null);
       const route = useRoute();
       const toastStore = useToastStore();
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
       onMounted(() => {
           window.addEventListener('scroll', handleScroll)
       })

       onUnmounted(() => {
           window.removeEventListener('scroll', handleScroll);
       })
       const oldScrollY = ref(window.scrollY);
       const handleScroll = (e) => {
           let element = scrollComponent.value;
           if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 2 && oldScrollY.value < window.scrollY) {
              getOrders()
           }
           oldScrollY.value = window.scrollY
       }
       return {
           ordersStore,
           scrollComponent
       }
   }
})
</script>