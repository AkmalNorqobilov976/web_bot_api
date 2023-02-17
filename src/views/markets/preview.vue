<template>
    <main class="market-preview d-grid-max-content">
        <div class="market-preview__cards" ref="scrollComponent">
            <market-card 
                v-for="(product, i) in $lodashGet(categoriesStore, '$state.products')" 
                :key="i" 
                :cardData="product"
            />

            <div ref="intersectionTrigger" style="height: 10px; background: transparent;"> </div>
        </div>
        <message-not-found v-if="!$lodashGet(categoriesStore, '$state.products', '').length"/>
    </main>
</template>

<script>
import MarketCard from '@/components/markets/MarketCard.vue'
import MessageNotFound from '@/components/MessageNotFound.vue';
import { useLastRoute } from '@/composables/useLastRoute';
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import { useStreamsStore } from '@/store/server/useStreamsStore';
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { makeUseInfiniteScroll } from "vue-use-infinite-scroll";

export default defineComponent({
    setup() {
        const categoriesStore = useCategoriesStore();
        const marketPreviewRef = ref(null)
        useLastRoute().setLastRoute();
        const route = useRoute();
        const scrollComponent = ref(null);
        const streamsStore = useStreamsStore();
        const getProductsByPagination = () => {
            categoriesStore.getProducts(route.params.status, 
                categoriesStore.query, 
                categoriesStore.page
            )
            categoriesStore.page++;
        }
        const intersectionTrigger = ref(null)
        const useInfiniteScroll = makeUseInfiniteScroll({});
        const pageRef = useInfiniteScroll(intersectionTrigger);
        const load = () => {
            categoriesStore.getProducts(
                route.params.status == 'all' ? "" : route.params.status, 
                categoriesStore.query, 
                categoriesStore.page
            )
        };
        watch(pageRef, () => {
            load()
        })
        onMounted(() => {
            streamsStore.streamForm = {
                charity: 1000,
                discount: 1000,
                product_id: "",
                name: ""
            }
            // window.addEventListener('scroll', handleScroll)
        })

        // onUnmounted(() => {
        //     window.removeEventListener('scroll', handleScroll);
        // })
        // const oldScrollY = ref(window.scrollY);
        // const handleScroll = (e) => {

        //     let element = scrollComponent.value;
        //     if(element?.getBoundingClientRect()?.bottom % window.innerHeight < 10 && oldScrollY.value < window.scrollY) {
        //         load();
        //     }
        //     oldScrollY.value = window.scrollY;
        // }
        return {
            categoriesStore,
            getProductsByPagination,
            scrollComponent,
            load,
            intersectionTrigger
        }
    },
    components: { MarketCard, MessageNotFound },
})
</script>

<style lang="scss" scoped>

</style>