<template>
  <div
   class="home"
   :style="{ backgroundImage: homeBackgroundImage }"
  >
    <!-- <button type="button" @click="heardKeyWord('voice')" name="button">sun</button> -->
    <Motion
     :values="responseCurrentState"
     tag="div"
     spring="gentle"
     data-cursor-hover >
      <v-squircle
       class="responses"
       radius="20px"
       padding="12px"
       slot-scope="_responseCurrentState"
       :style="{ transform: `translateY(${_responseCurrentState.offset}px)`, opacity: _responseCurrentState.opacity }" >
        {{responseText}}
        <caption class="info response--info">{{responseTextSecondary}}</caption>
      </v-squircle>
    </Motion>

    <div
     class="bottom"
     data-cursor-hover >
      <transition name="dissolve" appear>
        <v-squircle
         class="response--rich"
         radius="20px"
         padding="13px"
         v-if="richResponseType == 'voice' && wake" >
         <settings @vocal-trf-changed="setVocalTrf($event)"></settings>
        </v-squircle>
      </transition>

       <transition name="dissolve" appear>
         <v-squircle
          class="response--rich"
          radius="20px"
          padding="13px"
          v-if="richResponseType == 'compass' && wake" >
          <compass></compass>
         </v-squircle>
       </transition>

      <transition name="dissolve" appear>
        <v-squircle
         class="response--rich"
         radius="20px"
         padding="13px"
         v-if="richResponseType == 'measure' && wake" >
         <measure></measure>
        </v-squircle>
      </transition>

     <transition name="dissolve" appear>
       <v-squircle
        class="response--rich response--rich--short"
        radius="20px"
        padding="13px"
        v-if="richResponseType == 'food' && wake" >
        <food @barcode="barcodeRecognized" ></food>
       </v-squircle>
     </transition>

      <Motion
       :values="transcriptCurrentState"
       tag="div"
       spring="gentle" >
        <v-squircle
         class="transcripts"
         radius="20px"
         padding="12px"
         slot-scope="_transcriptCurrentState"
         :style="{ marginBottom: `${_transcriptCurrentState.offset}px`, opacity: _transcriptCurrentState.opacity }" >
          <speech-to-text v-if="wake && listening" @recognized-key-word="heardKeyWord($event)"></speech-to-text>
        </v-squircle>
      </Motion>
    </div>

    <waves :wave-height="waves" v-if="wake"></waves>

    <div
     data-cursor-hover
     class="iphone--home-indicator" >
      <div @click="wake = false"></div>
    </div>

  </div>
</template>

<script>
  import SpeechToText from '@/components/speech-to-text.vue'
  import Waves from '@/components/waves.vue'
  import Compass from '@/components/compass.vue'
  import Measure from '@/components/Measure.vue'
  import Food from '@/components/Food.vue'
  import Settings from '@/components/settings.vue'
  import sunInfo from '@/mixins/sunInfo.js'
  import micMeter from '@/mixins/micMeter.js'
  export default {
    mixins: [
      sunInfo,
      micMeter
    ],
    components: {
      SpeechToText,
      Waves,
      Compass,
      Settings,
      Measure,
      Food
    },
    data() {
      return {
        wake: false,
        listening: false,
        waves: [0,0,0,0,0],
        elementStates: {
          hidden: {
            offset: -50,
            opacity: 0
          },
          active: {
            offset: 0,
            opacity: 1
          }
        },
        transcriptCurrentState: {
            offset: -50,
            opacity: 0
        },
        responseCurrentState: {
            offset: -50,
            opacity: 0
        },
        vocalTrf: {
          pitch: 0,
          formant: 0
        },
        richResponse: false,
        richResponseType: "",
        responseText: "",
        responseTextSecondary: "",
        responseAudioURL: "",
        responseAudio: null,
        homeBackgroundImage: "var(--img-background)",
        waveMover: null,
        time: 0,
        settingsAudios: [],
        lastSettingsAudio: null,
      }
    },
    methods: {
      barcodeRecognized() {
        this.wake = false;
        let _this = this;
        setTimeout(function () {
          _this.responseText = "This product contains traces of soy, which you’re allergic to.";
          _this.responseTextSecondary = "Learn more in Health →";
          _this.responseAudioURL = require(`@/assets/audio/soy/soy-${_this.vocalTrf.pitch}d-${_this.vocalTrf.formant}d.mp3`);
          _this.wake = true;
          _this.richResponse = false;
          _this.richResponseType = "";
          _this.responseCurrentState = _this.elementStates.active;
          _this.responseAudio = new Audio(_this.responseAudioURL);
          _this.responseAudio.play();
        }, 300);
      },
      setVocalTrf(trf) {
        this.time = this.settingsAudios[trf.pitch+4][trf.formant+4].currentTime;
        if (this.time == 0 || this.settingsAudios[trf.pitch+4][trf.formant+4].currentTime > 24) {
          for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
              this.time = 0;
              this.settingsAudios[i][j].currentTime = 0;
              this.settingsAudios[i][j].play();
              this.settingsAudios[i][j].volume = 0;
            }
          }
        }
        this.settingsAudios[trf.pitch+4][trf.formant+4].volume = 1;
        if (this.lastSettingsAudio) {
          this.lastSettingsAudio.volume = 0;
        }
        this.lastSettingsAudio = this.settingsAudios[trf.pitch+4][trf.formant+4];

        if (trf.pitch == 0 && trf.formant == 0) {
          this.vocalTrf = trf;
        }
        else if (trf.pitch == -2 && trf.formant == -2) {
          this.vocalTrf = trf;
        }
      },
      heardKeyWord (keyword) {
        setTimeout(() => {
          this.transcriptCurrentState = this.elementStates.hidden;
          this.listening = false;
        }, 1500);

        let activeCase = "";

        switch (keyword) {
          case "sun":
          case "sunset":
          case "Sun":
          case "Sunset":
            activeCase = "compass";
            this.responseText = "The sun will set right over there at " + this.sunsetStr + ".";
            break;
          case "voice":
          case "sound":
          case "Voice":
            activeCase = "voice";
            this.responseText = "Gender is a construct, have a look at these settings:";
            break;
          case "tall":
          case "Tall":
          case "building":
          case "Building":
            activeCase = "measure";
            this.responseText = "You'll need to show me which one.";
            break;
          case "eat":
          case "Eat":
          case "allergic":
          case "chocolate":
            activeCase = "food";
            this.responseText = "Could you show me the packaging?";
            break;
        }
        setTimeout(() => {
          this.richResponseType = activeCase;
        }, 300);
        this.responseAudioURL = require(`@/assets/audio/${activeCase}/${activeCase}-${this.vocalTrf.pitch}d-${this.vocalTrf.formant}d.mp3`);
        this.responseCurrentState = this.elementStates.active;
        this.richResponse = true;
        this.responseAudio = new Audio(this.responseAudioURL);
        this.responseAudio.play();
      },
    },
    watch: {
      wake: function (wake) {
         if (!wake) {
           this.transcriptCurrentState = this.elementStates.hidden;
           this.responseCurrentState = this.elementStates.hidden;
           this.responseText = "";
           this.homeBackgroundImage = "var(--img-background)";
         }
      }
    },
    created: function () {
      for (var i = 0; i < 9; i++) {
        this.settingsAudios[i] = [];
        for (var j = 0; j < 9; j++) {
          let settingsURL = require(`@/assets/audio/voice-settings/voice-${i-4}d-${j-4}d.mp3`)
          this.settingsAudios[i][j] = new Audio(settingsURL);
        }
      }

      this.getSunInfo(52.5,13.4);

      let _this = this;
      window.addEventListener('message', function(event) {
        if (event.data == "wake") {
          _this.wake = false;
          setTimeout(() => {
            _this.richResponseType = "";
            _this.richResponse = false;
            _this.wake = true;
            _this.listening = true;
            _this.transcriptCurrentState = _this.elementStates.active;
            _this.homeBackgroundImage = "var(--img-background--blurred)";
            _this.beginDetect();
            _this.moveWaves(_this);
          }, 200);
        }
        else if (event.data == "sleep") {
          clearInterval(_this.waveMover);
          _this.waves = [0,0,0,0,0];
        }
      });
    }
  };
</script>

<style scoped>
.home {
  transition: background-image .3s var(--cubic-ease);
  background-size: 120vh;
  background-position: center;
  min-height: 100%;
  min-width: 100%;
}

button {
  margin: 50px;
}

.mic-meter {
  position: absolute;
  right: 0px;
  left: 0px;
  bottom: 0px;
  background-color: hsla(0,100%,100%,0.8);
}

.bottom {
  position: absolute;
  width: 100%;
  bottom: 80px;
}

.response--rich {
  margin-bottom: 8px;
}

.transcripts >>> .v-squircle--slot {
  background-position-y: bottom;
}

.response--rich >>> .v-squircle--slot {
  background-position-y: -300px;
}

.response--rich--short >>> .v-squircle--slot {
  background-position-y: -510px;
}

.responses {
  position: absolute;
  width: 100%;
  top: 80px;
}

.response--info {
  margin-bottom: 0px;
  display: block;
}

.responses >>> .v-squircle--slot {
  background-position-y: top;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity .4s linear;
}

.dissolve-enter,
.dissolve-leave-to {
  opacity: 0;
}
</style>
