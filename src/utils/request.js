import { useTelegram } from "@/composables/useTelegram";
import axios from "axios";

const { user } = useTelegram();
user
const BOT_TOKEN = ""
const service = axios.create({
    baseURL: "https://larashop.yuzka.uz/api/"
    // baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage`
});
// 192.168.1.83 larashop

export {
     service as request 
};