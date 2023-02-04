<template>
    <message-not-found v-if="!ordersStore.$state.orders.length || messageNotFoundStore.$state.isError"/>
    <div>
        <query-list-card v-for="(order, i) in ordersStore.$state.orders" :key="i" :listData="order"/>
        <query-list-card btnBgColor="#23B60B" btnText="Yangi"/>
    </div>

</template>

<script>
import { defineComponent } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
import { useOrdersStore } from "@/store/server/useOrdersStore";
import { useMessageNotFoundStore } from "@/store/useMessageNotFoundStore";
export default defineComponent({
    components: {
        QueryListCard
    },
    setup() {
        const messageNotFoundStore = useMessageNotFoundStore();
        const ordersStore = useOrdersStore();

        return {
            ordersStore,
            messageNotFoundStore
        }
    }
})
</script>