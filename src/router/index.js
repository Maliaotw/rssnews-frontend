import Vue from 'vue'
import Router from 'vue-router'
import rolec from '@/utils/role'

Vue.use(Router)

/* Layout */
import Layout from '@/views/Layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// import UsersRoute from './users'
// import ApplicationsRoute from './applications'
// import PermsRoute from './perms'
// import SessionsRoute from './sessions'
// import commonRoutes from './common'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 全局路由
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            // permissions: [rolec.PERM_AUDIT]
        },
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/Login')
            },
            {
                path: 'registrations/new',
                name: 'registrations',
                component: () => import('@/views/Registrations.vue')
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/index/news')
            },
            {
                path: 'source',
                name: 'source',
                component: () => import('@/views/index/source')
            },
            {
                path: 'subscription',
                name: 'subscription',
                component: () => import('@/views/index/subscription')
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/views/index/settings')
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/notFound'),
        hidden: true
    },
]

/**
 * user routes
 * the routes that need to be dynamically loaded based on user roles
 */
// 权限路由
// import userPageRoutes from './userPage'

/**
 * admin
 * the routes that need to be dynamically loaded based on admin roles
 */
// export const allRoleRoutes = [
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     meta: {
//       // permissions: [rolec.PERM_AUDIT]
//     },
//     children: [
//       {
//         path: 'home',
//         name: 'home',
//         component: () => import('@/views/index/rss')
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true, meta: { roles: ['SuperAdmin', 'Admin', 'Auditor', 'User'] }}
// ]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    base: '/ui/',
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
