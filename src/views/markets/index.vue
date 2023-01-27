<template>
   <div class="position-relative">
        <form @submit.prevent="">
            <div>
                <search-input 
                    placeholder="Qidirish"
                    v-model.number="good"
                />
            </div>
        </form>
        <!-- v-if="categoriesStore.$state.categoriesStore" -->
        <div >
            <tabs class="position-sticky top-0" :tabs="tabs"/>
        </div>
        <router-view/>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useCategoriesStore } from '@/store/server/useCategoriesStore'
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import { defineComponent, onMounted, ref, watch } from 'vue-demi';
import { useToastStore } from '@/store/useToastStore';
import { useRoute } from 'vue-router';
export default defineComponent({
    setup() {
        const good = ref("")
        const { backButton } = useBackButton()
        const categoriesStore = useCategoriesStore()
        const toastStore = useToastStore()
        const route = useRoute();
        onMounted(() => {
            categoriesStore.getCategories()
            getProducts()
        })
        backButton('/')

        const getProducts = (status) => {
            status = status == "all" ? "" : status;
            categoriesStore.getProducts(status? status: null)
                .catch(error => {
                    toastStore.showToastAsAlert({
                        message: error.response.data.message,
                        type: 'error',
                        delayTime: 1000
                    })
                })
        }

        watch(route, (newValue) => {
            getProducts(newValue.params.status);
        }, {
            immediate: true,
            deep: true
        })
        return {
            good,
            categoriesStore
        }
    },
    data: () => ({
        tabs: [
            {
                to: "/markets/preview/all",
                text: "Barchasi"
            },
            {
                to: "/markets/preview/new",
                text: "Yangilar"
            },
            {
                to: "/markets/preview/ready",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/markets/preview/active",
                text: "Yetkazilmoqda"
            },
            {
                to: "/markets/preview/deliveried",
                text: "Yetkazib berildi"
            },
            {
                to: "/markets/preview/cancelled",
                text: "Qaytib keldi"
            },
            {
                to: "/markets/preview/not-necessary",
                text: "Keyin oladi"
            },
            {
                to: "/markets/preview/archive",
                text: "Arxiv"
            },
            {
                to: "/markets/preview/spam",
                text: "Spam"
            },
        ]
    }),
    components: {
        Tabs,
        SearchInput,
    } 
})
</script>
