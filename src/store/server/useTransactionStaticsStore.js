import { adminTransactionStatics } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useTransactionStaticsStore = defineStore('transactions-statics', {
    state: () => ({
        transactionStatics: []
    }),
    actions: {
        getTransactionStatics() {
            return new Promise((resolve, reject) => {
                adminTransactionStatics()
                .then(response => {
                    this.transactionStatics = response.data;
                    resolve(true)
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
})