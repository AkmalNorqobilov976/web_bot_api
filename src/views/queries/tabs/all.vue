<template>
    <div>
        <query-list-card/>
        <query-list-card btnBgColor="#23B60B" btnText="Yangi"/>
    </div>

</template>

<script>
import { defineComponent } from "vue";
import QueryListCard from '@/components/cards/QueryListCard.vue'
export default defineComponent({
    components: {
        QueryListCard
    },
    methods: {
        goTabRight(e) {
            console.log(e);
        },

        goTabLeft(e) {
            console.log(e);
        }
    }
})
</script>