import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/layout/notFound'

const routes = [
    {
        path: '/',
        name: 'top',
        component: () => import('../pages/index.vue'),
    },
    {
    path: '/send/:id',
    name: 'send',
    component: () => import('../pages/send.vue'),
    },
    {
    path: '/accounts',
    name: 'accounts',
    component: () => import('../pages/accounts.vue'),
    },
    {
    path: '/:pathMatch(.)',
    name: 'NotFound',
    component: NotFound,
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router