import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App);
app.config.globalProperties.$tg = window.Telegram.WebApp;
app.use(store).use(router).mount('#app')
