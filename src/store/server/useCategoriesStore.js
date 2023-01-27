import { adminCategories, adminProducts } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', {
    state: (() => ({
        categories: [],
        ha: true,
        products: [],
        selectedProduct: null
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

        getProducts(status) {
            console.log(status, "status");
            return new Promise((resolve, reject) => {
                adminProducts()
                    .then(response => {
                        console.log(response, "data");
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