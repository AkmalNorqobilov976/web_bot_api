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

        <div v-if="categories.$state.categories">
            <tabs class="position-sticky top-0" :tabs="tabs"/>
        </div>
        <router-view/>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton'
import { useCategories } from '@/store/server/useCategories'
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import { defineComponent, onMounted, ref } from 'vue-demi';
export default defineComponent({
    setup() {
        const good = ref("")
        const { backButton } = useBackButton()
        const categories = useCategories()
        onMounted(() => {
            categories.getCategories()
        })
        backButton('/')

        return {
            good,
            categories
        }
    },
    data: () => ({
        tabs: [
            {
                to: "/markets",
                text: "Barchasi"
            },
            {
                to: "/markets/new",
                text: "Yangilar"
            },
            {
                to: "/markets/ready",
                text: "Yetkazishga tayyor"
            },
            {
                to: "/markets/active",
                text: "Yetkazilmoqda"
            },
            {
                to: "/markets/deliveried",
                text: "Yetkazib berildi"
            },
            {
                to: "/markets/cancelled",
                text: "Qaytib keldi"
            },
            {
                to: "/markets/not-necessary",
                text: "Keyin oladi"
            },
            {
                to: "/markets/archive",
                text: "Arxiv"
            },
            {
                to: "/markets/spam",
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
