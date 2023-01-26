import { adminOrders } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: []
    }),
    actions: {
        getOrders({ status }) {
            return new Promise((resolve, reject) => {
                adminOrders({ status })
                    .then(response => {
                        console.log(response);
                        this.orders = response.data.data;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
    }
})