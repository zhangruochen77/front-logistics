// 引入 axios
import axios from 'axios'
import {Message} from "element-ui"

const service = axios.create({
    // baseURL: 'http://192.168.195.130',
    baseURL: 'http://localhost',
    timeout: 15000 // 请求超时时间
})

// 设置响应接口
service.interceptors.response.use(success => {

    let status = success.status
    let code = success.data.code
    console.log("code = " + code)

    return success

}, error => {
    let status = error.status

    switch (status) {
        case 404:
            Message.error('页面不存在')
            return
        case 403:
            Message.error('未登录')
            return
        case 500:
            Message.error('服务器开小差了')
            return
        default:
            return
    }
})

service.interceptors.request.use(success => {
    success.headers['plat'] = 'FRONT'
    if (window.sessionStorage.getItem('token')) {
        success.headers['Authorization'] = window.sessionStorage.getItem('token')
    }

    return success
}, error => {

})

export default service