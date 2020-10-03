import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAnime from 'vue-animejs';
import VueSpeech from 'vue-speech';


Vue.use(VueSpeech);

Vue.use(VueAnime);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
