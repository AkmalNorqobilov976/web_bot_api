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
                    <bar-chart/>
                    <balans-history-bar-chart title="xarid qilingan va bekor qilingan mahsulotlar statistikasi" xKey="name" yKey="amount" :data="barChartData"/>
                
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
import BarChart from '@/components/charts/BarChart.vue'
import BalanceHistoryListComponent from '@/components/payments/BalanceHistoryListComponent.vue'
export default {
    setup() {
    },
     data: () => ({
        barChartData: [
            {
                name: "Roses",
                amount: 25
            },
            {
                name: "Tulips",
                amount: 40
            },
            {
                name: "Daisies",
                amount: 15
            },
            {
                name: "Narcissuses",
                amount: 9
            }
        ],
    }),
    components: {
        SearchInput,
        BalansHistoryBarChart,
        InfoCard,
        BalanceHistoryListComponent,
        BarChart
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
