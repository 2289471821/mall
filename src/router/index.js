import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('views/home/Home')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('views/category/Category')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('views/cart/Cart')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('views/profile/Profile')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('views/detail/Detail')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
