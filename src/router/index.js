import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/Layout'

Vue.use(Router)

export default new Router({
    routes: [{
            name: '首页',
            path: '/',
            redirect: '/dashboard',
            component: Layout
        },
        {
            name: '个人中心',
            path: '/dashboard',
            component: Layout,
            redirect: '/dashboard/userInfo',
            meta: {
                auth: true
            },
            children: [{
                    name: '用户信息',
                    path: 'userInfo',
                    meta: {
                        siderNav: true
                    },
                    component: () =>
                        import ('@/pages/UserInfo/userInfo')
                },
                {
                    name: '用户管理',
                    path: 'admin',
                    meta: {
                        level: [1]
                    },
                    component: () =>
                        import ('@/pages/UserControl/userControl')
                }

            ]
        },
        {
            name: '商品管理',
            path: '/merchan',
            meta: {
                auth: true
            },
            redirect: '/merchan/myCommit',
            component: Layout,
            children: [{
                    name: '我的商品',
                    path: 'myCommit',
                    meta: {},
                    component: () =>
                        import ('@/pages/Merchan/merchan')
                },
                {
                    name: '商品编辑',
                    path: 'editCommit',
                    meta: {},
                    component: () =>
                        import ('@/pages/Newchan/chanEditPage')
                },
                {
                    name: 'test',
                    path: 'test',
                    meta: {},
                    component: () =>
                        import ('@/pages/Newchan/common/batchEdit')
                }
            ]
        },
        {
            name: '登录页面',
            path: '/login',
            meta: {
                only: true,
                auth: false,
                crumb: false,
                hidden: true
            },
            component: () =>
                import ('@/pages/Login/login')
        },
        {
            name: '404',
            path: '*',
            meta: {
                only: true,
                auth: false,
                crumb: false,
                hidden: true
            },
            component: () =>
                import ('@/pages/404page/404.vue')
        },

    ]
})