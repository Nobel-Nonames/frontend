import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from '@/router'
import 'ant-design-vue/dist/reset.css'
import './assets/tailwind.css'

const app = createApp(App)

app
  .use(router)
  .use(Antd)
  .mount('#app')