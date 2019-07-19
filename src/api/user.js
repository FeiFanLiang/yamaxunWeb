import axios from './request';

export default {
    async login(params){
        return axios.request({
            method:'post',
            url:'/login',
            FormData:params
        })
    },
    async logout(){
        return axios.request({
            method:'get',
            url:'/logout'
        })
    },
    async regist(params){
        return axios.request({
            method:'get',
            url:'/creatAccount',
            FormData:params
        })
    }
    
}