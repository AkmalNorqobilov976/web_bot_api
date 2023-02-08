import { useNumberFormatter } from "@/composables/useNumberFormatter";
import { queryMaker } from "@/utils/former";
import { request } from "@/utils/request";

const { numberReformatter } = useNumberFormatter();

const URI = 'advertiser'
export function adminOrders({status}) {
    let query = status ? `?status=${status}`: ""
    return request({
        url: `${URI}/orders${query}`,
        method: "get"
    });
}

export function adminProducts(categoryId, query) {
    let urlParams = "?"
    if(categoryId) {
        urlParams += `category_id=${categoryId}`
    }
    if(query) {
        urlParams = `query=${query}`
    }
    return request({
        url: `${URI}/products/?${urlParams}`,
        method: 'get',
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


export function updateAdminStream(data) {
    console.log(data, 'before');
    data.charity = numberReformatter(data?.charity);
    data.discount = numberReformatter(data?.discount);
    console.log(data, "after");
    return request({
        url: `${URI}/streams/${data.id}`,
        method: 'put',
        data
    })
}

export function deleteAdminStream({ stream_id }) {
    return request({
        url: `${URI}/streams/${stream_id}`,
        method: 'delete'
    })
}

export function postAdminStream(data) {
    data.charity = numberReformatter(data?.charity);
    data.discount = numberReformatter(data?.discount);
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

export function adminTransactions(query) {
    let urlParams = "?";
    if(query) {
        urlParams += `query=${query}`
    }
    return request({
        url: `${URI}/transactions${urlParams}`,
        method: "get"
    });
}

export function postAdminWithdraw({ card_number, amount }) {
    amount = numberReformatter(amount);
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

export function adminProfile() {
    return request({
        url: `${URI}/profile`,
        method: 'get'
    });
}