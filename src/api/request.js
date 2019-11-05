import axios from 'axios'
import {
    Message,
} from 'iview';
const baseURL = 'http://www.amazonvvip.com/api'
    //const baseURL = 'http://127.0.0.1:7001/api'
const server = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true
})

server.interceptors.response.use((response) => {

    if (response.data.code == -1) {
        this.router.push({
            name: '登录页面'
        })
        return
    }

    // if (response.data.code === 0) {
    //     this.$Message.error('请求失败')
    //     return
    // }
    if (response.data.code === 400) {
        this.$Message.error('您没有权限操作')
        return
    }
    return response.data

}, (error) => {

    console.log(error)
    Message.error(`您的请求失败`)
        // Promise.reject(error)
})

export default server