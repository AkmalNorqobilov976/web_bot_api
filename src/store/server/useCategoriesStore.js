import { adminCategories, adminProducts } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', {
    state: (() => ({
        query: "",
        page: 1,
        category_id: '',
        categories: [],
        ha: true,
        products: [],
        selectedProduct: {}
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

        getProducts(status, query, page) {
            return new Promise((resolve, reject) => {
                adminProducts(status, query, page)
                    .then(response => {
                        if(this.page == 1) {
                            this.products = [ ...response.data.data ];    
                        } else {
                            this.products = [...this.products, ...response.data.data];
                        }
                        this.page++;
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})