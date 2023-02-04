import { defineStore } from "pinia";

export const useMessageNotFoundStore = defineStore('message-not-found-store', {
    state: () => ({
        isError: false,
        isLoading: false
    }),
    actions: {
        setIsError(value) {
            this.isError = value;
        },
        setIsLoading(value) {
            this.isLoading = value;
        }
    }
})