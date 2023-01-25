import { adminStreams } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const useStreams = defineStore('streams', {
    state: () => ({
        streams: []
    }),
    actions: {
        getStreams() {
            return new Promise((resolve, reject) => {
                adminStreams()
                .then(response => {
                    this.streams = response.data.data;
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
})