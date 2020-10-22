import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VSquircle from "vue-squircle";
import CursorFx from '@luxdamore/vue-cursor-fx';
import '@luxdamore/vue-cursor-fx/dist/CursorFx.css';
import VueMotion from 'vue-motion';
import SVGInjectorVue from 'svginjector-vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)

Vue.use(SVGInjectorVue)

Vue.use(VueMotion);

Vue.use(CursorFx);

Vue.use(VSquircle);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
