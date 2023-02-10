import { adminPromoCodes } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const usePromoCodesStore = defineStore('promo-codes', {
    state: () => ({
        page: 1,
        promoCodes: []
    }),
    actions: {
        getPromoCodes() {
            return new Promise((resolve, reject) => {
                adminPromoCodes(this.page)
                    .then(response => {
                        this.promoCodes = [ ...this.promoCodes, ...response.data.data];
                        this.page++;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
    }
})