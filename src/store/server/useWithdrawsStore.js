import { postAdminWithdraw, adminWithdraws } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useWithdrawsStore = defineStore('withdraws', {
    state: () => ({
        withdraws: [],
        withdraw: null
    }),

    getters: {
        getNewWithdraws(state) {
            return state.withdraws.filter(withdraw => withdraw.status === 'new')
        }
    },
    actions: {
        getWithdraws() {
            return new Promise((resolve, reject) => {
                adminWithdraws()
                    .then(response => {
                        this.withdraws = response.data.data;
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },

        getWithdraw() {
            return Promise((resolve, reject) => {
                postAdminWithdraw()
                    .then(response => {
                        this.withdraw = response.data.data;
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})