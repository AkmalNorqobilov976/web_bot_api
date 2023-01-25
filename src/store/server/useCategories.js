import { adminCategories, adminProducts } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useCategories = defineStore('categories', {
    state: (() => ({
        categories: [],
        ha: true,
        products: [],
    })),

    actions: {
        getCategories() {
            return new Promise((resolve, reject) => {
                adminCategories()
                    .then(response => {
                        console.log(response);
                        this.categories = response.data.data; 
                        resolve(response.data.data)
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        },

        getProducts() {
            return new Promise((resolve, reject) => {
                adminProducts()
                    .then(response => {
                        this.products = response.data.data;
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})