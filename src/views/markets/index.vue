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
        <tabs class="position-sticky top-0" :tabs="tabs"/>
        <router-view/>
   </div>
</template>

<script>
import Tabs from '@/components/Layout/Tabs.vue'
import { useBackButton } from '@/composables/useBackButton';
import SearchInput from '@/components/Form/inputs/SearchInput.vue'
import { ref } from 'vue-demi';
export default {
    setup() {
        const good = ref("")
        const { backButton } = useBackButton()
        backButton('/')

        return {
            good
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
}
</script>
