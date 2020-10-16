import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueAnime from 'vue-animejs';
import VSquircle from "vue-squircle";
import CursorFx from '@luxdamore/vue-cursor-fx';
import '@luxdamore/vue-cursor-fx/dist/CursorFx.css';
import VueMotion from 'vue-motion';
// import DiscoveryV1 from 'ibm-watson/discovery/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';


Vue.use(VueMotion);

Vue.use(CursorFx);

Vue.use(VueAnime);

Vue.use(VSquircle);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



  // const discoveryClient = new DiscoveryV1({
  //   authenticator: new IamAuthenticator({ apikey: 'S4jPIPNhYBKDVY1oKHFJfVdjb1uERhvtNa_v7tsLtl_o' }),
  //   version: '2019-02-01',
  // });
// // This example takes uncompressed wav audio from the Text to Speech service and plays it through the computer's speakers
// // Should work on windows/mac/linux, but linux may require some extra setup first: https://www.npmjs.com/package/speaker
//
// const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
// const wav = require('wav');
// const Speaker = require('speaker');
//
// const textToSpeech = new TextToSpeechV1({
//   // See: https://github.com/watson-developer-cloud/node-sdk#authentication
// });
//
// const reader = new wav.Reader();
//
// // the "format" event gets emitted at the end of the WAVE header
// reader.on('format', function (format) {
//   // the WAVE header is stripped from the output of the reader
//   reader.pipe(new Speaker(format));
// });
//
// textToSpeech
//   .synthesize({ text: 'hello from IBM Watson', accept: 'audio/wav' })
//   .then(response => {
//     response.result.pipe(reader);
//   })
//   .catch(err => {
//     console.log(err);
//   });
