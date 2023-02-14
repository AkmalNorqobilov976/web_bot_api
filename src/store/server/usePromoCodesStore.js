import { adminPromoCodes } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const usePromoCodesStore = defineStore('promo-codes', {
    state: () => ({
        page: 1,
        last_page: 2,
        loading: false,
        promoCodes: []
    }),
    actions: {
        getPromoCodes() {
            return new Promise((resolve, reject) => {
                if(this.page < this.last_page && !this.loading) {
                    this.loading = true;
                    adminPromoCodes(this.page)
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            this.promoCodes = [ ...this.promoCodes, ...response.data.data];
                            this.page++;
                            this.loading =false;
                            resolve(true);
                        })
                        .catch(error => {
                            this.loading =false;
                            reject(error);
                        });
                }
            })
        }
    }
})