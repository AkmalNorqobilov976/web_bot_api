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
        <message-not-found v-if="!transactionsStore.$state.transactions.length || messageNotFoundStore.$state.isError"/>
        <info-card 
           
            class="balance-history__info-card" 
            title="To‘lovlar monitoringi"
        >
            <template #body>
                <p class="balance-history__info-card--barchart-title">
                    xarid qilingan va bekor qilingan mahsulotlar statistikasi
                </p>
                <div class="balance-history__info-card--body">
                    <bar-chart-example/>
                    <!-- <bar-chart/> -->
                    <!-- <balans-history-bar-chart title="xarid qilingan va bekor qilingan mahsulotlar statistikasi" xKey="name" yKey="amount" :data="barChartData"/> -->
                
                    <balance-history-list-component
                        v-for="(transaction, i) in transactionsStore.$state.transactions"
                        :key="i" 
                        :cardData="transaction"
                    />       
                        <!-- :icon="transaction.type =='minus' ? 'ri-arrow-left-down-line' : 'ri-arrow-right-up-line'"
                        :iconColor="transaction.type ? '#23B60B' : '#F1A30C'" -->
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
import InfoCard from '@/components/cards/InfoCard.vue'
// import BarChart from '@/components/charts/BarChart.vue'
import BalanceHistoryListComponent from '@/components/payments/BalanceHistoryListComponent.vue'
import BarChartExample from '@/components/charts/BarChartExample.vue'
import { defineComponent, onBeforeMount } from 'vue-demi'
import { useToastStore } from '@/store/useToastStore'
import { useWithdrawsStore } from '@/store/server/useWithdrawsStore'
import { useBackButton } from '@/composables/useBackButton'
import { useTransactionsStore } from '@/store/server/useTransactionsStore'
import MessageNotFound from '@/components/MessageNotFound.vue'
import { useMessageNotFoundStore } from '@/store/useMessageNotFoundStore'
export default defineComponent({
    setup() {
        const toastStore = useToastStore();
        const withdrawsStore = useWithdrawsStore()
        const transactionsStore = useTransactionsStore();
        const { backButton } = useBackButton();
        const messageNotFoundStore = useMessageNotFoundStore();

        backButton('/')
        const getWithDraws = () => {
            transactionsStore.getTransactions()
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }

        onBeforeMount(() => {
            getWithDraws();
        })

        return {
            transactionsStore,
            messageNotFoundStore
        }
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
        InfoCard,
        BalanceHistoryListComponent,
        // BarChart,
        BarChartExample,
        MessageNotFound
    }
})
</script>


<style lang="scss" scoped>
    .balance-history {
        &__info-card {
            margin-top: -.0rem;
            &--body {
                margin: 0 -1.6rem;
            }
        }
    }

    .balance-history__info-card--barchart-title {
        font-size: 1.2rem;
        color: $gray-variant;
        margin-top: .8rem;
    }
</style>
