<template>
    <div class="balance-history">
        <form @submit.prevent="">
            <div>
                <search-input 
                    placeholder="Qidirish"
                    v-model="good"
                />
            </div>
        </form>
        <info-card class="balance-history__info-card" title="To‘lovlar monitoringi">
            <template #body>
                <div class="balance-history__info-card--body">
                    <balans-history-bar-chart/>
                
                    <balance-history-list-component 
                        icon="ri-arrow-left-down-line"
                        iconColor="#23B60B"
                    />       
                    <balance-history-list-component 
                        icon="ri-arrow-right-up-line"
                        iconColor="#F1A30C"
                    />     
                </div> 
            </template>
        </info-card>
    </div>
</template>

<script>
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import BalansHistoryBarChart from '@/components/charts/BalansHistoryBarChart.vue'
import InfoCard from '@/components/cards/InfoCard.vue'
import BalanceHistoryListComponent from '@/components/payments/BalanceHistoryListComponent.vue'
export default {
    setup() {
    },
    components: {
        SearchInput,
        BalansHistoryBarChart,
        InfoCard,
        BalanceHistoryListComponent
    }
}
</script>


<style lang="scss" scoped>
    .balance-history {
        &__info-card {
            &--body {
                margin: 0 -1.6rem;
            }
        }
    }
</style>
