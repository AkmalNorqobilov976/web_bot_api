<template>
    <!-- <router-link to="/about">About</router-link> -->
    <message-not-found v-if="messageNotFoundStore.$state.isError"/>
    <!-- <loading v-if="messageNotFoundStore.$state.isLoading"/> -->
    <toast/>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue';
import Toast from './components/Toast.vue';
import { useMessageNotFoundStore } from './store/useMessageNotFoundStore';
// import Loading from '@/components/Loading.vue'
import MessageNotFound from './components/NetworkError.vue';

    export default defineComponent({
        components: {
            Toast,
            // Loading,
                MessageNotFound
        },

        setup() {
            const messageNotFoundStore = useMessageNotFoundStore();

            return {
                messageNotFoundStore
            }
        }
    })
</script>
<style lang="scss">
</style>
