import { adminCategories, adminProducts } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', {
    state: (() => ({
        query: "",
        page: 1,
        last_page: 2,
        loading: false,
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
                if(this.page <= this.last_page && !this.loading) {
                    this.loading = true;
                    adminProducts(status, query, page)
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            if(this.page == 1) {
                                this.products = [ ...response.data.data ];    
                            } else {
                                this.products = [...this.products, ...response.data.data];
                            }
                            this.loading = false;
                            this.page++;
                            resolve(true)
                        })
                        .catch(error => {
                            this.loading = false;
                            reject(error);
                        })
                }
            })
        }
    }
})