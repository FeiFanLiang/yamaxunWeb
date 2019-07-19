import axios from 'axios'



const server = axios.create({
    baseURL: '127.0.0.1:7001/api',
    timeout: 8000
})
server.interceptors.request.use(() => {
    console.log(this.$cookies)
})
server.interceptors.response.use((response) => {
    if(response.data.code == -1){
        this.router.push({
            name:'登录页面'
        })
        return
    }
    if(response.data.code === 0){
        this.$Message.error('请求失败')
        return
    }
    if(response.data.code === 400){
        this.$Message.error('您没有权限操作')
        return
    }
    return response.data

}, (error) => {
    this.$Message.error(`您的请求失败`)
    Promise.reject(error)
})

export default server