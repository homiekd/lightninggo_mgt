import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store'
import https from '@/utils/https'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      // 首頁 > 系統首頁
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard'),
        meta: {
          breadcrumb: [{ text: '系統首頁' }]
        }
      },
      // 庫存管理 > 產品列表
      {
        path: '/inProductMgt/productList',
        name: 'ProductList',
        component: () => import('@/views/inProductMgt/productList/ProductList'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '產品管理' }, { text: '產品列表' }]
        }
      },
      // 庫存管理 > 產品列表
      {
        path: '/inProductMgt/test',
        name: 'Test',
        component: () => import('@/views/inProductMgt/test/Test'),
        meta: {
          breadcrumb: [{ text: '產品管理' }, { text: '產品種類' }]
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

/**
 * 路由導航
 * to: 將要去到哪個頁面
 * from: 從哪個頁面過來
 * next: 放行到哪個頁面
 */
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  // 判斷用戶使否登入
  if (!token) {
    if (to.path === '/login') {
      next()
    } else {
      // next({ path: '/login' })
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    // 判斷vuex中是否存在用戶基本訊息
    if (!store.state.roles || store.state.roles.length < 1) {
      // 像後端發送請求，取得用戶基本訊息
      const api = '/sys/getInfo'
      https.get(api).then((res) => {
        const user = res.data.data
        store.commit('setName', user.username)
        if (user.sysUserRoles.length > 0) {
          //
        }
      })
    }
    // 已經登入成功
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})
