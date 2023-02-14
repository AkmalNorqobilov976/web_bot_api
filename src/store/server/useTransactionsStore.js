import { adminTransactions } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useTransactionsStore = defineStore('transaction', {
    state: () => ({
        page: 1,
        last_page: 2,
        loading: false,
        transactions: []
    }),

    actions: {
        getTransactions(query) {
            return new Promise((resolve, reject) => {
                if(this.page <= this.last_page && !this.loading) {
                    this.loading = true;
                    adminTransactions(this.page, query)
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            this.transactions = [ ...this.transactions, ...response.data.data ];
                            this.loading = false;
                            resolve(true);
                        })
                        .catch(error => {
                            this.loading = false;
                            reject(error);
                        })
                }
            })
        }
    }
})