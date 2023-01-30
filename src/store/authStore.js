import { getProfile } from '@/api/advertiserApi';
import { request } from '@/utils/request';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('login', {
    state: () => ({
        isAuthenticated: false,
        token: localStorage.getItem('token') || "",
        smsIsSent: false,
        code: "",
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
        },

        getUserInfo() {
            return new Promise((resolve, reject) => {
                getProfile()
                    .then(response => {
                        this.userInfo = response.data.data;
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error);
                    });

            })
        }
    }
})