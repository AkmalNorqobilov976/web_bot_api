import { adminStreams, updateAdminStream } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const useStreamsStore = defineStore('streams', {
    state: () => ({
        streams: [],
        stream: null,
        streamForm: {
            product_id: "",
            name: "",
            charity: "",
            discount: ""
        }
    }),
    actions: {
        clearStreamForm() {
            this.streamForm = {
                product_id: "",
                name: "",
                charity: "",
                discount: ""
            }
        },
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
        },
        updateStream(data) {
            return new Promise((resolve, reject) => {
                updateAdminStream(data)
                    .then(() => {
                        resolve(true)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})