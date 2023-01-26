import { queryMaker } from "@/utils/former";
import { request } from "@/utils/request";

const URI = 'advertiser'
export function adminOrders({status}) {
    let query = status ? `?status=${status}`: ""
    return request({
        url: `${URI}/orders${query}`,
        method: "get"
    });
}

export function adminProducts() {
    return request({
        url: `${URI}/products`,
        method: 'get'
    });
}

export function adminCategories() {
    return request({
        url: `${URI}/categories`,
        method: "get"
    });
}

export function adminPromoCodes() {
    return request({
        url: `${URI}/promo-codes`,
        method: 'get'
    });
}

export function postPromoCode({ code }) {
    return request({
        url: `${URI}/promo-codes`,
        method: 'post',
        data: {
            code
        }
    })
}

export function adminStreams() {
    return request({
        url: `${URI}/streams`,
        method: "get"
    });
}

export function getAdminStream({ id }) {
    return request({
        url: `${URI}/streams/${id}`,
        method: 'get'
    });
}

export function adminWithdraws() {
    return request({
        url: `${URI}/withdraws`,
        method: "get"
    });
}

export function postAdminWithdraw({ card_number, amount }) {
    return request({
        url: `${URI}/withdraw`,
        method: "post",
        data: {
            card_number,
            amount
        }
    });
}


export function getProfile() {
    return request({
        url: `${URI}/profile`,
        method: 'get'
    });
}


export function adminStatistics(params) {
    const query = queryMaker(params)
    return request({
        url: `${URI}/streams/statistics?${query}`,
        method: 'get'
    })
}