import { defineStore } from "pinia";

export const useMessageNotFoundStore = defineStore('message-not-found-store', {
    state: () => ({
        isError: false,
    }),
    actions: {
        setIsError(value) {
            this.isError = value;
        }
    }
})