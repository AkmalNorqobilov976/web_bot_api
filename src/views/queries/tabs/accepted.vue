<template>
    <message-not-found />
    <div>
        <query-list-card v-for="(order, i) in ordersStore.$state.orders" :key="i" :listData="order"/>
        <query-list-card btnBgColor="#23B60B" btnText="Yangi"/>
    </div>

</template>

<script>
import { defineComponent } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
import { useOrdersStore } from "@/store/server/useOrdersStore";
export default defineComponent({
    components: {
        QueryListCard
    },
    setup() {
        const ordersStore = useOrdersStore();

        return {
            ordersStore
        }
    }
})
</script>