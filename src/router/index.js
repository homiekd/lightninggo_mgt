import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// import store from '@/store'
// import https from '@/cores/https'

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
      // 商品管理 > 商品列表
      {
        path: '/productMgt/productList',
        name: 'ProductList',
        component: () => import('@/views/productMgt/productList/ProductList'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '商品管理' }, { text: '商品列表' }]
        }
      },
      // 庫存管理 > 產品列表
      {
        path: '/productMgt/test',
        name: 'Test',
        component: () => import('@/views/productMgt/test/Test'),
        meta: {
          breadcrumb: [{ text: '商品管理' }, { text: '商品種類' }]
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
  if (token) {
    next()
  } else {
    if (to.path !== '/login') { next('/login') } else { next() }
  }
})
