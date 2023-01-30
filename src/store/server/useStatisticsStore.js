import { adminStatistics } from "@/api/advertiserApi";
import { defineStore } from "pinia";

export const useStatisticsStore = defineStore('statistic', {
    state: () => ({
        statistics: []
    }),

    actions: {
        getStatistics(params) {
            return new Promise((resolve, reject) => {
                adminStatistics(params)
                    .then(response => {
                        this.statistics = response.data.data;
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