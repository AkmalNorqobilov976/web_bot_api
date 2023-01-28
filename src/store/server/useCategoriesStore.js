import { adminCategories, adminProducts } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', {
    state: (() => ({
        categories: [],
        ha: true,
        products: [],
        selectedProduct: null
    })),
    getters: {
        getCategoriesForTab: (state) => {
            return state.categories.map(category => {
                return {
                    to: `/markets/preview/${category.id}`,
                    text: category.title
                }
            })
        }
    },
    actions: {
        getCategories() {
            return new Promise((resolve, reject) => {
                adminCategories()
                    .then(response => {
                        this.categories = response.data.data; 
                        resolve(response.data.data)
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        },

        getProducts(status, query) {
            return new Promise((resolve, reject) => {
                adminProducts(status, query)
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