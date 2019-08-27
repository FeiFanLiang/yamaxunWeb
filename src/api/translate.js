import axios from './request';

export default {
	async translate(params){
		return axios({
			method:'get',
			url: '/translate',
			params
		})
	}
}