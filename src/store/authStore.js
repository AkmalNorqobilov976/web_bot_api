import { request } from '@/utils/request';
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
        smsLogin({ phone }) {
           return new Promise((resolve, reject) => {
                request({
                    method: 'post'
                })
           }) 
        }
    }
})