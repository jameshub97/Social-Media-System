import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import 'element-plus/dist/index.css'
import "./assets/index.scss";
import { Icon } from '@iconify/vue';

const app = createApp(App)
app.use(Icon)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(VueCookies)
app.mount('#app')
