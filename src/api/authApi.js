import { formerSingleFile } from "@/utils/former";
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

export function myProfile() {
    return request({
        url: "profile",
        method: "get"
    });
}


export function updateMyProfile(data) {
    if(typeof data.avatar !== 'object') {
        delete data.avatar;
    }
    const form = formerSingleFile(data);
    return fetch(`${process.env.VUE_APP_SERVICE_URI}/profile/update`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        },
        body: form,
        method: 'post'
    })
    // return request({
    //     url: 'profile/update',
    //     method: 'post',
    //     data: form
    // })
}

export function logoutUser() {
    return request({
        url: 'profile/invalidate-token',
        method: 'post'
    })
}