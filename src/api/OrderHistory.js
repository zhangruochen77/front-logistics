import request from '@/utils/Request'

const baseUrl = `/front/order/orderHistory`

export default {
    pageFindHistoryOrder(page, limit) {
        return request({
            url: `${baseUrl}/pageFind/${page}/${limit}`,
            method: 'get'
        })
    }
}