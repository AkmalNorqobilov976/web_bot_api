import { adminLocations } from "@/api/advertiserApi";
import { getDistricts } from "@/api/helpersApi";
import { defineStore } from "pinia";

export const useHelperStore = defineStore('helper', {
    state: () => ({
        regions: [],
        districts: [],
    }),

    actions: {
        getRegions() {
            return new Promise((resolve, reject) => {
                adminLocations()
                    .then(response => {
                        this.regions = response.data.data;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        getDistricts() {
            return new Promise((resolve, reject) => {
                getDistricts()
                    .then(response => {
                        this.districts = response.data.data;
                        resolve(true);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        }
    }
})