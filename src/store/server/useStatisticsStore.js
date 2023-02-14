import { adminStatistics } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useStatisticsStore = defineStore('statistic', {
    state: () => ({
        page: 1,
        last_page: 2,
        loading: false,
        statistics: []
    }),

    actions: {
        getStatistics(params) {
            return new Promise((resolve, reject) => {
                if(this.page <= this.last_page && !this.loading) {
                    adminStatistics(params, this.page)
                        .then(response => {
                            this.last_page = response.data.meta.last_page;
                            if(this.page == 1) {
                                this.statistics = [ ...response.data.data ];
                            } else {
                                this.statistics = [ ...this.statistics, ...response.data.data];
                            }
                            this.loading = false;
                            this.page++;
                            resolve(true)
                        })
                        .catch(error => {
                            this.loading = false;
                            reject(error)
                        })
                }
            })
        }
    }
})