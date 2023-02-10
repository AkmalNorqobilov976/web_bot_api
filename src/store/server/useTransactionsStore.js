import { adminTransactions } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useTransactionsStore = defineStore('transaction', {
    state: () => ({
        page: 1,
        transactions: []
    }),

    actions: {
        getTransactions(query) {
            return new Promise((resolve, reject) => {
                adminTransactions(this.page, query)
                    .then(response => {
                        this.transactions = [ ...this.transactions, ...response.data.data ];
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})