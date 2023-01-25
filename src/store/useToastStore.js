import { defineStore } from "pinia";

export const useToastStore = defineStore('toast-store', {
    state: () => ({
        isShownToast: false,
        x: "110px",
        y: "12px",
        message: "",
        delayTime: 300
    }),

    actions: {
        showToast({message, x, y, delayTime}) {
            this.isShownToast = true;
            this.message = message;
            this.x = `${x}px`;
            this.y = `${y}px`;
            this.delayTime = delayTime ? delayTime : 300
            console.log(this.x, this.y);
            setTimeout(() => {
                this.isShownToast = false
            }, this.delayTime);
        }
    }
})
