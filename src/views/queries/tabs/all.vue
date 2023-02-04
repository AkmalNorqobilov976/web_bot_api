<template>
     <div class="d-grid-max-content">
        <div>
            <query-list-card v-for="(order, i) in ordersStore.$state.orders" :key="i" :listData="order"/>
            <query-list-card btnBgColor="#23B60B" btnText="Yangi"/>
        </div>
        <message-not-found v-if="!ordersStore.$state.orders.length"/>
   </div>

</template>

<script>
import { defineComponent } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
import { useOrdersStore } from "@/store/server/useOrdersStore";
import MessageNotFound from "@/components/MessageNotFound.vue";
export default defineComponent({
    components: {
        QueryListCard,
        MessageNotFound
    },
    setup() {
        const ordersStore = useOrdersStore();

        return {
            ordersStore
        }
    }
})
</script>