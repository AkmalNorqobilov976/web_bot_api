import { adminPromoCodes } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const usePromoCodesStore = defineStore('promo-codes', {
    state: () => ({
        promoCodes: []
    }),
    actions: {
        getPromoCodes() {
            return new Promise((resolve, reject) => {
                adminPromoCodes()
                    .then(response => {
                        this.promoCodes = response.data.data;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
    }
})