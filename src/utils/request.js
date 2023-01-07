import { useTelegram } from "@/composables/useTelegram";
import axios from "axios";

const { user } = useTelegram();
user
const BOT_TOKEN = ""
const service = axios.create({
    baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage`
});


export {service};