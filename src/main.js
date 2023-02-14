import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3TouchEvents  from 'vue3-touch-events'
import { createPinia } from 'pinia'
import vClickOutside from "click-outside-vue3"
import { Money3Directive } from 'v-money3'
import { plugin as VueInputAutowidth, directive as VueInputAutowidthDirective} from 'vue-input-autowidth'
import {VueRestrictedInputDirective} from 'vue-restricted-input';
import Vue3Lottie from 'vue3-lottie'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import 'vue3-lottie/dist/style.css'
import 'remixicon/fonts/remixicon.css'
import '@/assets/scss/main.scss'
import 'nprogress/nprogress.css' 
import { useCardNumberPatternMatch } from './composables/useCardNumberPatternMatch'
const pinia = createPinia()
const app = createApp(App);
window.addEventListener('DOMContentLoaded', () => {
    let lastRoute = localStorage.getItem('last-route');
    if(lastRoute) {
        router.push(`${lastRoute}`)
    }
})
app.component("infinite-loading", InfiniteLoading);
app.use(Vue3Lottie);
app.use(VueInputAutowidth);
app.config.globalProperties.$noImage = 'https://archive.org/download/no-photo-available/no-photo-available.png';
app.use(pinia);
app.use(vClickOutside)
app.config.globalProperties.$filter = {
    debitCardFormat(e) {
        return useCardNumberPatternMatch({
            input: e,
            template: 'xxxx xxxx xxxx xxxx'
        });
    },

    numberFormat(e) {
        return new Intl.NumberFormat(undefined).format(e)
    }
}

app.directive('mask', VueRestrictedInputDirective);
app.directive('money3', Money3Directive);
app.directive('autowidth', VueInputAutowidthDirective);
app.directive('resizable', (el, binding)=> {
    var int = 18;
    function resize() {el.style.width = ((el.value.length+1) * int) + 'px'}
    var e = 'keyup,keypress,focus,blur,change'.split(',');
    for (var i in e) el.addEventListener(e[i],resize,false);
    resize();
})
app.use(Vue3TouchEvents)
app.use(router).mount('#app')
