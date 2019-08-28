import axios from './request';

export default {
	async translate(params){
		return axios({
			method:'get',
			timeout:3*60*1000,
			url: '/translate',
			params
		})
	}
}