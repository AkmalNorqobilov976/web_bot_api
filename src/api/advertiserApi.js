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

export function adminProducts(categoryId, query) {
    return request({
        url: `${URI}/products`,
        method: 'get',
        data: {
            category_id: categoryId,
            query: query?.value
        }
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

export function getAdminPromocode(promoCode_id) {
    return request({
        url: `${URI}/promo-codes/${promoCode_id}`
    })
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

export function deleteAdminStream({ stream_id }) {
    return request({
        url: `${URI}/streams/${stream_id}`,
        method: 'delete'
    })
}

export function postAdminStream(data) {
    return request({
        url: `${URI}/streams`,
        method: 'post',
        data
    })
}

export function adminWithdraws() {
    return request({
        url: `${URI}/withdraws`,
        method: "get"
    });
}

export function adminTransactions() {
    return request({
        url: `${URI}/transactions`,
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
        // headers: {
        //     Authorization: 
        // },
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

export function adminLocations() {
    return request({
        url: `${URI}/locations`,
        method: 'get'
    });
}