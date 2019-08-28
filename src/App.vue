<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {userApi} from '@/api'
export default {
  name: 'App',
  mounted(){
    this.getUser()
  },
  
  methods:{
    ...mapMutations(['updateUser']),
    async getUser(){
      const userInfo = JSON.parse(sessionStorage.getItem('user'))
    if(userInfo){
      this.updateUser(userInfo)
    }else{
			if(this.$cookies.isKey('__v')){
				 const res = await userApi.userInfo()
      sessionStorage.setItem('user',JSON.stringify(res.data))
      this.updateUser(res.data)
			}
    }
    }
  }
}
</script>

<style>
	#app{
		height: 100%;
	}
  #app .ivu-layout-content{
    background: none !important;
  }
</style>
