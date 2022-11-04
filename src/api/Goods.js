import request from '@/utils/Request'

const baseUrl = `/front/warehouse/goods`

export default {
    pageFindGoods(page, limit, goodsParams) {   // 用户分页查找商品数据
        return request({
            url: `${baseUrl}/pageFindGoods/${page}/${limit}`,
            method: 'post',
            data: goodsParams
        })
    },

    getGoodsDetailsById(id) {  // 获取商品详细信息
        return request({
            url: `${baseUrl}/getGoodsDetailsById/${id}`,
            method: 'get'
        })
    },

    userDoOrder(id, number) {  // 用户下订单操作
        return request({
            url: `${baseUrl}/userDoOrder/${id}/${number}`,
            method: 'post'
        })
    },


}