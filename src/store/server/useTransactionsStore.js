import { adminTransactions } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useTransactionsStore = defineStore('transaction', {
    state: () => ({
        transactions: []
    }),

    actions: {
        getTransactions() {
            return new Promise((resolve, reject) => {
                adminTransactions()
                    .then(response => {
                        this.transactions = response.data.data;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})