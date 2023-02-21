import { adminCharity } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useDonationsStore = defineStore('donation', {
    state: () => ({
        donations: [],
        balance: 0,
        page: 1,
        last_page: 2,
        loading: false
    }),

    actions: {
        getDonations() {
            return new Promise((resolve, reject) => {
                if(this.page <= this.last_page && !this.loading) {
                    this.loading = true;
                    adminCharity(this.page)
                        .then(response => {
                            this.balance = response.data.balance;
                            this.donations = response.data.data;
                            this.last_page = response.data.meta.last_page;
                            this.loading = false;
                            this.page++;
                            resolve(true);
                        }).catch(error => {
                            this.loading = false;
                            reject(error);
                        })
                }
            })
        }
    }
})