import { adminStreams, updateAdminStream } from "@/api/advertiserApi";
import { defineStore } from "pinia";
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from "@vuelidate/validators";

export const useStreamsStore = defineStore('streams', {
    state: () => {
        let streamForm = {
            product_id: "",
            name: "",
            charity: "1,000",
            discount: "1,000"
        };
        let streamFormValidationRules = {
            name: {
                required: required
            },
            charity: {
                maxLength: maxLength(6),
                minLength: minLength(5)
            },
            discount: {
                maxLength: maxLength(6),
                minLength: minLength(5)
            }
        }
        return {
            streams: [],
            stream: null,
            streamForm: streamForm,
            streamFormValidationRules,
            $vToAdd: useVuelidate(streamFormValidationRules, streamForm)
        }
    },
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
                        console.log(error, "server errror");
                        reject(error)
                    })
            })
        }
    }
})