import request from '@/utils/Request'

const baseUrl = `/front/order/order`

export default {
    pageFindGoods(page, limit) {   // 用户查找自己为完成的商品信息
        return request({
            url: `${baseUrl}/pageFind/${page}/${limit}`,
            method: 'get'
        })
    },

    userSureOrder(orderId) {  // 用户确认订单送达
        return request({
            url: `${baseUrl}/userSureOrder/${orderId}`,
            method: 'post'
        })
    }
}