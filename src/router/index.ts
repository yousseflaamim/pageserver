import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import GuestView from '@/views/GuestView.vue';
import AdminViewBooks from '@/views/AdminViewBooks.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/register',
    name: 'RegisterView',
    component:RegisterView
  },
 
  {
    path: '/guestview',
    name: 'GuestView',
    component: GuestView
  },
  {
    path: '/adminviewbooks',
    name: ' AdminViewBooks',
    component: AdminViewBooks
  },

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
