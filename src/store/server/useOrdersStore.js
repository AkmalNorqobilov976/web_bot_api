import { adminOrders } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        page: 1,
        last_page: 2,
        query: "", 
        loading: false,
        orders: []
    }),
    actions: {
        getOrders({ status }) {
            return new Promise((resolve, reject) => {
                if(this.page <= this.last_page && !this.loading) {
                    this.loading = true;
                    adminOrders({ status, query: this.query })
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            if(this.page == 1) {
                                this.orders = [ ...response.data.data ];
                            } else {
                                this.orders = [ ...this.orders, ...response.data.data];
                            }
                            this.loading = false;
                            this.page++;
                            resolve(true);
                        })
                        .catch(error => {
                            this.loading = false;
                            reject(error);
                        });
                }
            })
        }
    }
})