import { useRoute } from "vue-router";

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token') || false;
}

export function setLastRouter() {
    const route = useRoute();
    localStorage.setItem('last-router', route.path);
}

export function getLastRouter() {
    return localStorage.getItem('last-router');
}