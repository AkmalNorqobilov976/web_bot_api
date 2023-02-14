import { useRoute } from "vue-router";

export function setToken(token) {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('token', token);
            resolve(true)
        } catch (error) {
            reject(error);
        }
    })
}

export function getToken() {
    return localStorage.getItem('token') || false;
}