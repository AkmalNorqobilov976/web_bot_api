<template>
   <div class="position-relative">
        <form @submit.prevent="">
            <div>
                <search-input 
                    placeholder="Qidirish"
                    :searchFunction="searchFunction"
                    v-model="categoriesStore.query"
                />
            </div>
        </form>
        <div v-if="tabs.length" class="position-sticky top-0">
            <tabs  :tabs="[ {to: '/markets/preview/all', text: 'Barchasi'} ,...tabs]"/>
        </div>
        <router-view/>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useToastStore } from '@/store/useToastStore';
import { useRoute } from 'vue-router';
import { adminProducts } from '@/api/advertiserApi';
export default defineComponent({
    setup() {
        const query = ref("")
        const { backButton } = useBackButton()
        const categoriesStore = useCategoriesStore()
        const toastStore = useToastStore()
        const route = useRoute();
        const tabs = ref([]);
        let page = ref(1);
        onMounted(() => {
            categoriesStore.getCategories()
                .then(() => {
                    tabs.value = categoriesStore.getCategoriesForTab; 
                })
            getProducts()
                
        })
        backButton('/')
        
        const getProducts = (status, query, page) => {
            status = status == "all" ? "" : status;
            categoriesStore.getProducts(status, query, page)
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 3000
                    })
                })
        }
        const searchFunction = () => {
            let status = route.params.status == 'all' ? "" : route.params.status;
            adminProducts(status, categoriesStore.query, 1)
            .then((response) => {
                categoriesStore.$patch({
                    products: response.data.data,
                    page: 2,
                    last_page: response.data.meta.last_page
                })
            }).catch(error => {
                toastStore.showToastAsAlert({
                    message: error.response.data.message,
                    type: 'error',
                    delayTime: 3000
                })
            })
        }

        watch(route, (newValue) => {
            categoriesStore.page = 1;
            getProducts(route.params.status, categoriesStore.query, categoriesStore.page);
        }, {
            deep: true
        })
        return {
            query,
            categoriesStore,
            tabs,
            searchFunction,
        }
    },
    components: {
        Tabs,
        SearchInput,
    } 
})
</script>
