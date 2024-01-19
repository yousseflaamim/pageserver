import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import axiosInstance from './axios-instance';

const storedToken = localStorage.getItem('authToken');
if (storedToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}

const app = createApp(App);

//axios.defaults.baseURL = 'http://localhost:3000';

app.config.globalProperties.$axios = axios;

app.use(router).mount('#app');


