import axios from './request';

export default {
    async login(params) {
        return axios({
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
        return axios({
            method: 'post',
            url: '/creatAccount',
            data: params
        })
    },
    async userInfo() {
        return axios({
            method: 'get',
            url: '/userInfo'
        })
    },
    async updateUser(params) {
        return axios({
            method: 'post',
            url: '/updateUser',
            data: params
        })
    },
    async getSubUser() {
        return axios({
            method: 'get',
            url: '/auth/getSubUserList'
        })
    },
    async deletUserFromAuth(params){
        return axios({
            method:'get',
            url:'/auth/deleteUser',
            params
        })
    },
    async creatNewUserFromAuth(params){
        return axios({
            method:'post',
            url:'/auth/creatAccountFromAuth',
            data:params
        })
    },
    async updateUserFromAuth(params){
        return axios({
            method:'post',
            url:'/auth/updateUserFromAuth',
            data:params
        })
    }

}