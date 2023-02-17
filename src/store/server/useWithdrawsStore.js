import { postAdminWithdraw, adminWithdraws } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useWithdrawsStore = defineStore('withdraws', {
    state: () => ({
        page: 1,
        last_page: 2,
        loading: false,
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
                if(this.page < this.last_page && !this.loading) {
                    this.loading = true;
                    adminWithdraws({page: this.page})
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            if(this.page == 1) {
                                this.withdraws = response.data.data;
                            } else {
                                this.withdraws = [ ...this.withdraws, ...response.data.data]
                            }
                            this.page++;
                            this.loading = false;
                            resolve(true)
                        })
                        .catch(error => {
                            this.loading = false;
                            reject(error);
                        })
                }
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