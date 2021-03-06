///api/creatNewMer
import axios from './request';

export default {
    async addMer(params) {
        return axios({
            method: 'post',
            url: '/creatNewMer',
            data: params
        })
    },
    async getMerList(params) {
        return axios({
            method: 'post',
            url: '/getMerList',
            data: params
        })
    },
    async updateMer(params) {
        return axios({
            method: 'post',
            url: '/editMer',
            data: params
        })
    },
    async getMerListFromAuth(params) {
        return axios({
            method: 'post',
            url: '/getMerListByAuth',
            data: params
        })
    },
    async deleteMer(params) {
        return axios({
            method: 'get',
            url: '/deleteMer',
            params
        })
    },
    async excelLoad(params) {
        return axios({
            method: 'post',
            url: '/excel',
            data: params
        })
    },
    async excelLoadFormAuth(params) {
        return axios({
            method: 'post',
            url: '/excelFormAuth',
            data: params
        })
    },
    async batchEdit(params) {
        return axios({
            method: 'post',
            url: '/batchEdit',
            data: params
        })
    },
    async linkSearch(params) {
        return axios({
            method: 'get',
            url: '/linkSearch',
            params
        })
    }
}