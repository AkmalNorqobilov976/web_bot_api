import { defineStore } from "pinia";

export const useToastStore = defineStore('toast-store', {
    state: () => ({
        isShownToast: false,
        x: "110px",
        y: "12px"
    }),

    actions: {
        showToast({x, y}) {
            this.isShownToast = true;
            this.x = `${x}px`;
            this.y = `${y}px`;
            console.log(this.x, this.y);
            setTimeout(() => {
                this.isShownToast = false
            }, 300);
        }
    }
})
