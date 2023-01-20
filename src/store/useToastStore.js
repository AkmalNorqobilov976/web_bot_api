import { defineStore } from "pinia";

export const useToastStore = defineStore('toast-store', {
    state: () => ({
        isShownToast: false,
        x: 0,
        y: 0
    }),

    actions: {
        showToast({x, y}) {
            this.isShownToast = true;
            this.x = x;
            this.y = y;
            setTimeout(() => {
                this.isShownToast = false
            }, 300);
        }
    }
})
