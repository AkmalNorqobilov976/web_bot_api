<template>
   <div class="position-relative">
        <form @submit.prevent="">
            <div>
                <search-input 
                    placeholder="Qidirish"
                    :searchFunction="searchFunction"
                    v-model="query"
                />
            </div>
        </form>
        <div v-if="tabs.length">
            <tabs class="position-sticky top-0" :tabs="[ {to: '/markets/preview/all', text: 'Barchasi'} ,...tabs]"/>
        </div>
        <router-view/>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue-demi';
import { useToastStore } from '@/store/useToastStore';
import { useRoute } from 'vue-router';
import { useCardNumberPatternMatch } from '@/composables/useCardNumberPatternMatch';
export default defineComponent({
    setup() {
        const query = ref("")
        const { backButton } = useBackButton()
        const categoriesStore = useCategoriesStore()
        const toastStore = useToastStore()
        const route = useRoute();
        const tabs = ref([]);
 
        onMounted(() => {
            categoriesStore.getCategories()
                .then(() => {
                    tabs.value = categoriesStore.getCategoriesForTab; 
                })
            getProducts()
                
        })
        backButton('/')

        const getProducts = (status, query) => {
            status = status == "all" ? "" : status;
            categoriesStore.getProducts(status, query)
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }

        const searchFunction = () => {
            getProducts(route.params.status, query)
        }

        watch(route, (newValue) => {
            getProducts(newValue.params.status, query);
        }, {
            immediate: true,
            deep: true
        })
        return {
            query,
            categoriesStore,
            tabs,
            searchFunction
        }
    },
    components: {
        Tabs,
        SearchInput,
    } 
})
</script>
