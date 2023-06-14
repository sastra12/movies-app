import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './style.css'
import router from './router/index'
import axiosInstance from '@/service/axios.js'

const pinia = createPinia()
const app = createApp(App)
app.provide('$axios', axiosInstance)
app.use(pinia)
app.use(router)
app.mount('#app')
