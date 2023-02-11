import { adminStatistics } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useStatisticsStore = defineStore('statistic', {
    state: () => ({
        page: 1,
        statistics: []
    }),

    actions: {
        getStatistics(params) {
            return new Promise((resolve, reject) => {
                adminStatistics(params, this.page)
                    .then(response => {
                        if(this.page == 1) {
                            this.statistics = [ ...response.data.data ];
                        } else {
                            this.statistics = [ ...this.statistics, ...response.data.data];
                        }

                        this.page++;
                        resolve(true)
                    })
                    .catch(error => {
                        this.statistics = [];
                        reject(error)
                    })
            })
        }
    }
})