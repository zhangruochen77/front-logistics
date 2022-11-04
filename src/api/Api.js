import request from '@/utils/Request'

const baseUrl = `/log/api/code`

export default {
    getCode(phone) {
        return request({
            url: `${baseUrl}/createCode/${phone}`,
            method: 'get'
        })
    }
}