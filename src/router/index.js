import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Dashboard',
      component: () => import('@/views/home/index'),
      meta: { title: '明裕同学Blog管理系统', icon: 'Home', affix:true }
    }]
  },
// 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'UserMagen',
    meta: { title: '用户管理', icon: 'UserMange' },
    children: [
      // 用户列表
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/user/list/index'),
        meta: { title: '用户列表', icon: 'List' }
      },
      // 添加用户
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/user/add/index'),
        meta: { title: '添加用户', icon: 'UserAdd' }
      }
    ]
  },
// 文章管理
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'ArticleMagen',
    meta: { title: '文章管理', icon: 'el-icon-s-help' },
    children: [
      // 文章列表
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/list/index'),
        meta: { title: '文章列表', icon: 'List' }
      },
      // 发布文章
      {
        path: 'publish',
        name: 'Publish',
        component: () => import('@/views/article/publish/index'),
        meta: { title: '发布文章', icon: 'Publish' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:9000/swagger-ui/index.html#/',
        meta: { title: '接口文档', icon: 'Port' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
