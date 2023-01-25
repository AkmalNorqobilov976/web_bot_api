import { request } from "@/utils/request";

const URI = 'advertiser'
export function adminOrders() {
    return request({
        url: `${URI}/orders`,
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

export function adminStreams() {
    return request({
        url: `${URI}/streams`,
        method: "get"
    });
}

export function adminWithdraws() {
    return request({
        url: `${URI}/withdraws`,
        method: "get"
    });
}

export function adminWithdraw({ card_number, amount }) {
    return request({
        url: `${URI}/withdraw`,
        method: "post",
        data: {
            card_number,
            amount
        }
    });
}