import { request } from "@/utils/request";

const URI = 'auth'
export function sendPhone({ phone }) {
    return request({
        url: `${URI}/sms-login`,
        data: {
            phone: phone
        },
        method: 'post'
    });
}

export function verifyCode({ phone, code }) {

    return request({
        url: `${URI}/verify-code`,
        data: {
            phone,
            code
        },
        method: 'post'
    });
}