import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

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
