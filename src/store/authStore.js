import { defineStore } from 'pinia';

export const useAuthStore = defineStore('login', {
    state: () => ({
        isAuthenticated: false,
        smsIsSent: false,
        userInfo: {}
    }),
    getters: {
        isAuthenticated: (state) => state.isAuthenticated
    },
    actions: {
    }
})