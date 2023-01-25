import { defineStore } from "pinia";

export const useToastStore = defineStore('toast-store', {
    state: () => ({
        isShownToast: false,
        x: "110px",
        y: "12px",
        message: "",
        icon: "",
        delayTime: 300,
        width: '60%'
    }),

    actions: {
        showToast({message, x, y, delayTime, width}) {
            console.log(message, x, y, delayTime, "show Toast");
            this.isShownToast = true;
            this.message = message;
            this.width = width ? `${width}%` : '60%'
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
