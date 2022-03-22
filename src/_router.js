import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout'

Vue.use(Router)

const routes = []

routes.push(
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('./views/index/news'),
            },
            {
                path: 'subscription',
                name: 'subscription',
                component: () => import('./views/index/subscription'),
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('./views/index/settings'),
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('./views/Login'),
            }
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('./views/notFound.vue')
    },
    {
        path: '*',    // 此处需特别注意至于最底部
        redirect: '/404'
    }
)

export default new Router({routes})
