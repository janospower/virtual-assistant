import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAnime from 'vue-animejs';
import VSquircle from "vue-squircle";
import CursorFx from '@luxdamore/vue-cursor-fx';
import '@luxdamore/vue-cursor-fx/dist/CursorFx.css';
import VueMotion from 'vue-motion'
import SunCalc from 'suncalc'

Vue.use(SunCalc)

Vue.use(VueMotion)

Vue.use(CursorFx);

Vue.use(VueAnime);

Vue.use(VSquircle);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
