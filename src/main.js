import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from '@/router/index.js'

axios.defaults.baseURL = 'http://127.0.0.1:8081'



const app =createApp(App)
app.use(router)
app.mount('#app')

app.config.globalProperties.$axios = axios