import request from '@/utils/Request'

const baseUrl = `/front/admin/user`

export default {
    loginByPassword(params) {   // 使用密码登录方式
        return request({
            url: `${baseUrl}/loginByPass`,
            method: 'post',
            data: params
        })
    },

    loginByPhone(params) {  // 使用密码方式登录
        return request({
            url: `${baseUrl}/loginByPhone`,
            method: 'post',
            data: params
        })
    },

    logout() {  // 退出登录
        return request({
            url: `${baseUrl}/logout`,
            method: 'post'
        })
    },

    registry(registryParams) {   // 用户注册操作
        return request({
            url: `${baseUrl}/registry`,
            method: 'post',
            data: registryParams
        })
    },

    getUserInfo() {  // 获取用户个人信息
        return request({
            url: `${baseUrl}/getUserInfo`,
            method: 'get'
        })
    }
}