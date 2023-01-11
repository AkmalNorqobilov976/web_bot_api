import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'

const app = createApp(App);
app.directive('resizeable', (el, binding) => {
    el.oninput = function () {
        console.log("zo'r", el.value.length * binding.modifiers.size);
        el.style.width = `${el.value.length * binding.modifiers.size + .6 }rem`;
    }
})
app.use(store).use(router).mount('#app')
