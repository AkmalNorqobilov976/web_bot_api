import { useTelegram } from "@/composables/useTelegram";
import axios from "axios";
import { getToken } from "./localStorage";
const token = getToken()

const service = axios.create({
    baseURL: "https://larashop.yuzka.uz/api/"
    // baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage`
});
// 192.168.1.83 larashop


service.interceptors.request.use( request => {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    request.headers['Accept'] = 'application/json';

    return request;
});


service.interceptors.response.use(response => {
    
    return response
}, error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
})
export {
     service as request 
};