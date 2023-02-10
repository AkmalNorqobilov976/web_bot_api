<template>
    <div class="d-grid-max-content">
        <div class="balance-history" ref="scrollComponent">
            <form @submit.prevent="">
                <div>
                    <search-input 
                        placeholder="Qidirish"
                        :searchFunction="searchFunction"
                        v-model="query"
                    />
                </div>
            </form>
            <info-card 
                v-if="transactionsStore.$state.transactions.length"
                class="balance-history__info-card" 
                title="To‘lovlar monitoringi"
            >
                <template #body>
                    <p class="balance-history__info-card--barchart-title">
                        xarid qilingan va bekor qilingan mahsulotlar statistikasi
                    </p>
                    <div class="balance-history__info-card--body">
                        <bar-chart :chartData="transactionsStore.$state.transactions" :xKey="day" :yKey="amount"/>
                    
                        <balance-history-list-component
                            v-for="(transaction, i) in transactionsStore.$state.transactions"
                            :key="i" 
                            :cardData="transaction"
                        />       
                        <balance-history-list-component 
                            icon="ri-arrow-right-up-line"
                            iconColor="#F1A30C"
                        />     
                    </div> 
                </template>
            </info-card>
        </div>
        <message-not-found v-if="!transactionsStore.$state.transactions.length"/>
    </div>
</template>

<script>
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import InfoCard from '@/components/cards/InfoCard.vue'
// import BarChart from '@/components/charts/BarChart.vue'
import BalanceHistoryListComponent from '@/components/payments/BalanceHistoryListComponent.vue'
import { defineComponent, onBeforeMount, ref, onMounted, onUnmounted } from 'vue-demi'
import { useToastStore } from '@/store/useToastStore'
import { useWithdrawsStore } from '@/store/server/useWithdrawsStore'
import { useBackButton } from '@/composables/useBackButton'
import { useTransactionsStore } from '@/store/server/useTransactionsStore'
import BarChart from '@/components/charts/BarChart.vue'
import MessageNotFound from '@/components/MessageNotFound.vue'
import { useLastRoute } from '@/composables/useLastRoute'
export default defineComponent({
    setup() {
        const toastStore = useToastStore();
        const withdrawsStore = useWithdrawsStore()
        const transactionsStore = useTransactionsStore();
        const scrollComponent = ref(null);
        const query = ref("");
        const { backButton } = useBackButton();
        useLastRoute().setLastRoute();
        backButton('/')
        const getWithDraws = (query) => {
            transactionsStore.getTransactions(query)
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: "Nimadir xato ketdi",
                        type: 'error',
                        delayTime: 3000
                    })
                })
        }

        const searchFunction = () => {
            getWithDraws(query.value)
        }
        onBeforeMount(() => {
            getWithDraws();
        })
        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })

        const handleScroll = (e) => {
            let element = scrollComponent.value;
            if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 20) {
                getWithDraws();
            }
        }

        return {
            transactionsStore,
            searchFunction,
            query,
            scrollComponent
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
        BarChart,
        MessageNotFound
        // ResponsiveLineChart,
        // BarChart,
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
