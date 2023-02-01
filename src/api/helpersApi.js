import { request } from "@/utils/request";
const URI = 'admin';

export function getRegions() {
    return request({
        url: `${URI}/regions`,
        method: 'get'
    });
}

export function getDistricts() {
    return request({
        url: `${URI}/districts`,
        method: 'get'
    })
}