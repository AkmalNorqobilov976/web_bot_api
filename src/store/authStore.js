import { defineStore } from 'pinia';

export const useAuthStore = defineStore('login', {
    state: () => ({
        isAuthenticated: false,
        userInfo: {}
    }),
    getters: {
        isAuthenticated: (state) => state.isAuthenticated
    },
    actions: {
        login(data) {
            console.log(data, "welll");
            this.isAuthenticated = true;
            console.log(this.isAuthenticated, this.userInfo);
            // this.userInfo = data;
        }
    }
})