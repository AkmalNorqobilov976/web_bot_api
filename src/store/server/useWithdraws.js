import { adminWithdraw, adminWithdraws } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useWithdraws = defineStore('withdraws', {
    state: () => ({
        withdraws: [],
        withdraw: null
    }),

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
                adminWithdraw()
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