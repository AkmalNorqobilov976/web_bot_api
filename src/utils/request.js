import { useTelegram } from "@/composables/useTelegram";
import axios from "axios";

const { user } = useTelegram();
user
const BOT_TOKEN = "5861450281:AAEpZ3soHXG8xNrOK4ccDJezAPw8fEziMfk"
const service = axios.create({
    baseURL: `https://api.telegram.org/${BOT_TOKEN}/sendMessage?chat_id=5882209120`
});


export {service};