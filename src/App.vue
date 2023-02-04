<template>
    <!-- <router-link to="/about">About</router-link> -->
    <message-not-found v-if="messageNotFoundStore.$state.isError"/>
    <!-- <loading v-if="messageNotFoundStore.$state.isLoading"/> -->
    <toast/>
  <router-view/>
</template>

<script>
import { defineComponent, watch } from 'vue-demi';
import Toast from './components/Toast.vue';
import { useMessageNotFoundStore } from './store/useMessageNotFoundStore';
// import Loading from '@/components/Loading.vue'
import MessageNotFound from './components/NetworkError.vue';
import nprogress from 'nprogress';

    export default defineComponent({
        components: {
            Toast,
            // Loading,
                MessageNotFound
        },

        setup() {
            const messageNotFoundStore = useMessageNotFoundStore();
            watch(nprogress, (newValue) => {
                console.log(newValue, "progr");
            }, {
                deep: true,
                immediate: true
            })
            return {
                messageNotFoundStore
            }
        }
    })
</script>
<style lang="scss">
</style>
