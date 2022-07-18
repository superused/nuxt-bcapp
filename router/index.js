import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/layout/notFound'

const routes = [
  // {
  //   path: '/',
  //   name: 'top',
  //   component: () => import('../pages/index.vue'),
  // },
  // {
  //   path: '/send/:id',
  //   name: 'send',
  //   component: () => import('../pages/send.vue'),
  // },
  // {
  //   path: '/accounts',
  //   name: 'AccountPage',
  //   component: () => import('../pages/accounts.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
