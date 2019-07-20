import server from './request';
console.log(server)
export default {
    async login(params) {
        return server({
            method: 'post',
            url: '/login',
            data: params
        })
    },
    async logout() {
        return axios.request({
            method: 'get',
            url: '/logout'
        })
    },
    async regist(params) {
        return axios.request({
            method: 'get',
            url: '/creatAccount',
            FormData: params
        })
    }

}