<template>
    <div v-if="messageNotFoundStore.$state.isError" class="message-not-found">
        <video class="message-not-found__video" autoplay loop muted>
            <source :src="require('@/assets/images/nothing.webm')" type="video/webm" />
        </video>
        <p class="message-not-found__title">
            Ulanishda xatolik
        </p>
        <p class="message-not-found__subtitle">
            Internetga ulanib qayta urinib ko‘ring
        </p>
    </div>
</template>


<script>
import { useMessageNotFoundStore } from "@/store/useMessageNotFoundStore";
import { defineComponent } from "vue-demi";

export default defineComponent({
    setup() {
        const messageNotFoundStore = useMessageNotFoundStore();
        return {
            messageNotFoundStore
        }
    }   
})
</script>
<style lang="scss" scoped>
    .message-not-found {
        background: $white;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__video {
            display: inline;
            width: 20rem;
            margin-top: -3rem;
            margin-bottom: 3rem;
        }
        &__title {
            color: $black;
            font-size: 2.2rem;
            margin-bottom: 1.5rem;
        }

        &__subtitle {
            font-size: 1.4rem;
            font-weight: 400;
            color: $gray;
        }
    }
</style>