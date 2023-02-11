<template>
    <div class="product-sorters">
            <div 
                class="product-sorters__by-name" 
                @click="filterFunction('product')"
            >
                Mahsulot
                <i class="ri-arrow-drop-down-fill" :class="[{'active-sorter': statisticsFilterAttributes.sortBy == 'product'}, {'active-d-sorter': statisticsFilterAttributes.sortByDesc == 'product'}]"></i>
            </div>
            <div 
                class="product-sorters__by-rating" 
                @click="filterFunction('orders')"
            >
                Reyting bilan
                <i class="ri-arrow-drop-down-fill" :class="[{'active-sorter': statisticsFilterAttributes.sortBy == 'orders'}, {'active-d-sorter': statisticsFilterAttributes.sortByDesc == 'orders'}]"></i>
            </div>
        </div>
        <!-- product orders -->
        <div class="product-lists d-grid-max-content">
            <div ref="scrollComponent">
                <statistics-list 
                    v-for="(item, i) in statisticsStore.$state.statistics" 
                    :key="i" 
                    :listData="item"
                />
                <statistics-list
                    btnText = "-500K"
                    btnTextBgColor="#ED5974"
                />
                <statistics-list
                    btnText = "0.00"
                    btnTextBgColor="#9EB2BD"
                />
            </div>
            <message-not-found v-if="!statisticsStore.$state.statistics.length"/>
        </div>
</template>

<script>

import MessageNotFound from '@/components/MessageNotFound.vue';
import StatisticsList from '@/components/statistics/StatisticsList.vue';
import { useLastRoute } from '@/composables/useLastRoute';
import { useStatisticsStore } from '@/store/server/useStatisticsStore';
import { useToastStore } from '@/store/useToastStore';
import { defineComponent, reactive, watch, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const statisticsStore = useStatisticsStore();
        const toastStore = useToastStore();
        const scrollComponent = ref(null);
        const route = useRoute();
        const statisticsFilterAttributes = reactive({
            sortBy: "",
            sortByDesc: ""
        })
        useLastRoute().setLastRoute();
        const filterFunction = (keyName) => {
            if(statisticsFilterAttributes.sortBy && statisticsFilterAttributes.sortBy == keyName) {
                statisticsFilterAttributes.sortByDesc = keyName
                statisticsFilterAttributes.sortBy = "";
            } else  if(statisticsFilterAttributes.sortBy == "" && statisticsFilterAttributes.sortBy == keyName){
                    statisticsFilterAttributes.sortBy = keyName
                    statisticsFilterAttributes.sortByDesc = "";
            } else if(statisticsFilterAttributes.sortByDesc && statisticsFilterAttributes.sortByDesc == keyName) {
                statisticsFilterAttributes.sortBy = keyName;
                statisticsFilterAttributes.sortByDesc = "";
            } else {
                statisticsFilterAttributes.sortByDesc = keyName;
                statisticsFilterAttributes.sortBy = "";
            }
        }
        const getStatistics = () => {
            statisticsStore.getStatistics({ ...statisticsFilterAttributes, status: route.params.tab !== 'all' ? route.params.tab : '' })
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
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
                getStatistics();
            }
            oldScrollY.value = window.scrollY
        }

        watch(statisticsFilterAttributes, () => {
            getStatistics();
        })
        return {
            statisticsStore,
            statisticsFilterAttributes,
            filterFunction,
            scrollComponent
        }
    },
    components: {
        StatisticsList,
        MessageNotFound
    }
})
</script>


<style lang="scss" scoped>
    $sorter-color: #9C9EA2;
    .product-sorters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .75rem 1.6rem;
        font-size: 1.3rem;
        color: $sorter-color;
        background: $white;
        @include card-mixin;
        &__by-name, &__by-rating {
            display: flex;
            align-items: center;
            gap: .624rem;
            i {
                font-size: 2.341rem;
                transition: all .5s ease;
                &.active-sorter {
                    color: $blue;
                    transform: rotateZ(180deg);
                }

                &.active-d-sorter {
                    
                    color: $blue;
                    transform: rotateZ(0deg);
                }
            }
        }
    }

    .product-lists {
        @include card-mixin;
        // border-top: ;
    }
    
</style>