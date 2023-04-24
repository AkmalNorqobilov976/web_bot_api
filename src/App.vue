<template>
    <message-not-found v-if="messageNotFoundStore.$state.isError"/>
    <toast/>
  <router-view/>
</template>

<script>
import { defineComponent, watch } from 'vue-demi';
import Toast from './components/Toast.vue';
import { useMessageNotFoundStore } from './store/useMessageNotFoundStore';
import MessageNotFound from './components/NetworkError.vue';

    export default defineComponent({
        components: {
            Toast,
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
