import { useTelegram } from "@/composables/useTelegram";
import { useMessageNotFoundStore } from '@/store/useMessageNotFoundStore'
import axios from "axios";
import { getToken } from "./localStorage";
const token = getToken()
import NProgress from "nprogress";
import { useRouter } from "vue-router";
const service = axios.create({
    // baseURL: 'http://192.168.1.21:8083/api/'
    baseURL: "https://larashop.yuzka.uz/api/",
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
    console.log(response, "resonse");
    NProgress.done();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsLoading(false);
    tg.MainButton.hideProgress();
    const router = useRouter();
    if(response.status == 401) {
        router.push('/login');
    }
    return response
}, error => {
    NProgress.done();
    tg.MainButton.hideProgress();
    const messageNotFoundStore = useMessageNotFoundStore();
    messageNotFoundStore.setIsError(false);
    messageNotFoundStore.setIsLoading(false);
    console.log('err' + error) // for debug
    const router = useRouter();
    console.log(error, "resonse");
    if(error.response.status == 401) {
        localStorage.removeItem('token');
        location.reload();
    }
    return Promise.reject(error)
})
export {
     service as request 
};