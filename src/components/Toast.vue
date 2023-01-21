<template>
   <teleport to="body">
        <div class="toast-component" v-if="toastStore.isShownToast">
            <copy-icon/>
            <!-- {{toastStore.isShownToast}} -->
            Manzil nusxalandi
        </div>
   </teleport>
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
</style>