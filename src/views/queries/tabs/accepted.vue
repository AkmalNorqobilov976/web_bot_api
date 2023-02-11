<template>
     <div class="d-grid-max-content">
        <div ref="scrollComponent">
            <query-list-card v-for="(order, i) in ordersStore.$state.orders" :key="i" :listData="order"/>
        </div>
        <message-not-found v-if="!ordersStore.$state.orders.length"/>
   </div>

</template>

<script>
import { defineComponent,ref, onMounted, onUnmounted } from "vue";
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
        const scrollComponent = ref(null);
        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })
        const oldScrollY = ref(window.scrollY);
        const handleScroll = (e) => {
            let element = scrollComponent.value;
            if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 20 && oldScrollY.value < window.scrollY) {
                // getPromocodes();
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