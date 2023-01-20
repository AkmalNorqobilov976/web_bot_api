<template>
   <teleport to="body">
        <div class="toast-component">
            <copy-icon/>
            {{useToastStore.$state}}
        </div>
   </teleport>
</template>

<script>
import { defineComponent } from "vue-demi";
import { useToastStore } from '@/store/useToastStore'
export default defineComponent({
    setup() {
        
        return {
            useToastStore
        }
    },
})
</script>