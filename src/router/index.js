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
      // 系統配置 > 用戶管理
      {
        path: '/systemMgt/userMgt',
        name: 'UserMgt',
        component: () => import('@/views/systemMgt/userMgt/UserMgt'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '系統配置' }, { text: '用戶管理' }]
        }
      },
      // 系統配置 > 角色管理
      {
        path: '/systemMgt/roleMgt',
        name: 'RoleMgt',
        component: () => import('@/views/systemMgt/roleMgt/RoleMgt'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '系統配置' }, { text: '角色管理' }]
        }
      },
      // 系統配置 > 權限管理
      {
        path: '/systemMgt/permissionMgt',
        name: 'PermissionMgt',
        component: () => import('@/views/systemMgt/permissionMgt/PermissionMgt'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '系統配置' }, { text: '權限管理' }]
        }
      },
      // 商品管理 > 品牌管理
      {
        path: '/productMgt/productBrandMgt',
        name: 'ProductBrandMgt',
        component: () => import('@/views/productMgt/productBrandMgt/ProductBrandMgt'),
        meta: {
          meta: { requiresAuth: true },
          breadcrumb: [{ text: '商品管理' }, { text: '品牌管理' }]
        }
      },
      // 商品管理 > 測試
      {
        path: '/productMgt/productCategoriesMgt',
        name: 'ProductCategoriesMgt',
        component: () => import('@/views/productMgt/productCategoriesMgt/ProductCategoriesMgt'),
        meta: {
          breadcrumb: [{ text: '商品管理' }, { text: '分類管理' }]
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
