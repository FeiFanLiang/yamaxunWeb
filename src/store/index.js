import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo:null
}

const mutations = {
    updateUser(state,user){
        if(user){
            if(user.role == 0){
                user.roleLabel = '商家'
            }
            if(user.role == 1){
                user.roleLabel = '二级代理'
            }
            if(user.role == 2){
                user.roleLabel = '一级代理'
            }
            if(user.role == 10){
                user.roleLabel = '超级管理员'
            }
            user.formatCreatTime = new Date(user.creatTime).toLocaleString()
        }
        state.userInfo = user
    }
}

const actions = {

}


const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store