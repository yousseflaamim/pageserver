import { createRouter, createWebHistory } from 'vue-router';
import Books from '../components/AdminViewBooks.vue';
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import Addnewbook from '../components/AdminViewEditingAddingBook.vue';
import Editbook from '../components/AdminViewEditBook.vue';
import AdminViewUser from '../components/AdminViewUser.vue';
import gust from  '../components/GuestView.vue';
const routes = [
  { path: '/library/books', component: Books },
  { path: '/auth/login', component: Login },
  { path: '/auth/register', component: Register },
  {path: '/gust' , component: gust},
  {path: '/Addnewbook',component: Addnewbook},
  {path: '/Editbook',component: Editbook},
  {path: '/admin/users', component: AdminViewUser},
  { path: '/', redirect: '/auth/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
