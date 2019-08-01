import axios from './request';

export default  {
    async getCategoryList(params){
        return axios({
            method:'get',
            url:'/categoryCountry',
            params
        })
    },
    

}