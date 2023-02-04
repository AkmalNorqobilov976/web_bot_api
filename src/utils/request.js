import { useTelegram } from "@/composables/useTelegram";
import { useMessageNotFoundStore } from '@/store/useMessageNotFoundStore'
import axios from "axios";
import { getToken } from "./localStorage";
const token = getToken()
import NProgress from "nprogress";
const service = axios.create({
    // baseURL: 'http://192.168.1.21:8083/api/'
    baseURL: "https://larashop.yuzka.uz/api/",
    timeout: 5000
    // baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage`
});
// 192.168.1.83 larashop


service.interceptors.request.use( request => {
    NProgress.start();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsError(false);
    messageNotFoundStore.setIsLoading(true);
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    request.headers['Accept'] = 'application/json';
    
    return request;
});


service.interceptors.response.use(response => {
    console.log(NProgress.status, "status");
    NProgress.done();
    console.log(NProgress.status, "status");
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsLoading(false);
    return response
}, error => {
    NProgress.done();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsError(false);
    messageNotFoundStore.setIsLoading(false);
    console.log('err' + error) // for debug
    return Promise.reject(error)
})
export {
     service as request 
};