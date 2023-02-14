import { adminStreams, updateAdminStream } from "@/api/advertiserApi";
import { defineStore } from "pinia";
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from "@vuelidate/validators";

export const useStreamsStore = defineStore('streams', {
    state: () => {
        let streamForm = {
            product_id: "",
            name: "",
            charity: "1000",
            discount: "1000"
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
            page: 1,
            last_page: 2,
            loading: false,
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
                if(this.page <= this.last_page && !this.loading) {
                    this.loading = true;
                    adminStreams(this.page)
                    .then(response => {
                        this.last_page = response.data.meta.last_page;
                        this.streams = [ ...this.streams, ...response.data.data ];
                        this.loading = false;
                        this.page++;
                        resolve(true);
                    })
                    .catch(error => {
                        this.loading = false;
                        reject(error);
                    })
                }
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