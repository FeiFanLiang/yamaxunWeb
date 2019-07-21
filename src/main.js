// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView, { TabPane } from 'iview';
import VueCookies from 'vue-cookies';
import './style/index.less';
//import 'iview/dist/styles/iview.css';
import store from './store'
Vue.use(VueCookies)
Vue.use(iView)
Vue.config.productionTip = false


router.beforeEach((to, form, next) => {
        // if (!router.app.$cookies.isKey('__v') && to.path !== '/login') {
        //     next({
        //         name: '登录页面'
        //     })
        // } else {
        //     next()
        // }
        next()
       
    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})