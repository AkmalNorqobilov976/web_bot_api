<template>
    <transition name="slide-fade">
        <teleport to="body" v-if="toastStore.isShownToast">
            <div class="toast-component">
                <copy-icon/>
                Manzil nusxalandi
            </div>
        </teleport>
    </transition>
</template>

<script>
import { computed, defineComponent } from "vue-demi";
import { useToastStore } from '@/store/useToastStore'
import copyIcon from "@/assets/svgs/copyIcon.vue";
export default defineComponent({
  components: { copyIcon },
    setup() {
        const toastStore = useToastStore()
        const positionToast = computed(() => {
            return {
                // top: toastStore.y,
                // left: toastStore.x,
                // display: toastStore.isShownToast ? 'unset' : 'none'
            }
        })
        return {
            toastStore,
            positionToast
        }
    },
})
</script>

<style lang="scss" scoped>
    .toast-component {
        position: fixed;
        width: 60%;
       
        z-index: 5;
        background: rgba($color: #272F38, $alpha: .9);
        border-radius: .57rem;
        color: $white;
        padding: 1.5rem 1.65rem;
        display: flex;
        align-items: center;
        gap: 1.25rem;
        top: v-bind('toastStore.y');
        left: v-bind('toastStore.x');
        font-size: 1.6rem;
        transition: all .3s ease;
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
    }
</style>