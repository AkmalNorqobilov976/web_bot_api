import { adminStreams, updateAdminStream } from "@/api/advertiserApi";
import { defineStore } from "pinia";


export const useStreamsStore = defineStore('streams', {
    state: () => ({
        streams: [],
        stream: null,
        streamForm: {
            product_id: "",
            name: "",
            charity: "1000",
            discount: "1000"
        }
    }),
    actions: {
        clearStreamForm() {
            this.streamForm = {
                product_id: "",
                name: "",
                charity: "1000",
                discount: "1000"
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
                    this.clearStreamForm();
                    resolve(true)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})