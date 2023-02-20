import { useTelegram } from "@/composables/useTelegram";
import { get } from 'lodash'
import { useMessageNotFoundStore } from '@/store/useMessageNotFoundStore'
import axios from "axios";
import { getToken } from "./localStorage";
const token = getToken()
import NProgress from "nprogress";
const service = axios.create({
    // baseURL: 'http://192.168.1.21:8083/api/'
    baseURL: `${process.env.VUE_APP_SERVICE_URI}/`,
    timeout: 5000
    // baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage`
});
// 192.168.1.83 larashop


service.interceptors.request.use( request => {
    NProgress.start();
    tg.MainButton.showProgress(true);
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsError(false);
    messageNotFoundStore.setIsLoading(true);
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    request.headers['Accept'] = 'application/json';
    
    return request;
});
const { tg } = useTelegram();


service.interceptors.response.use(response => {
    NProgress.done();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsLoading(false);
    tg.MainButton.hideProgress();
    return response
}, error => {
    NProgress.done();
    tg.MainButton.hideProgress();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsError(false);
    messageNotFoundStore.setIsLoading(false);
    if(get(error, 'response.status') == 401) {
        localStorage.removeItem('token');
        location.reload();
    }

    return Promise.reject(error)
})
export {
     service as request 
};