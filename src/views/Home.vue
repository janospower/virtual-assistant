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
      Measure
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

        switch (keyword) {
          case "sun" || "sunset" || "Sun" || "Sunset":
            setTimeout(() => {
              this.richResponseType = "compass";
            }, 300);
            this.responseText = "The sun will set right over there at " + this.sunsetStr + ".";

            this.responseAudioURL = require(`@/assets/audio/sun--olivia--vocaltrf-${this.vocalTrf.pitch}d-${this.vocalTrf.formant}d.mp3`);
            break;
          case "voice" || "sound" || "Voice":
            setTimeout(() => {
              this.richResponseType = "voice";
            }, 300);
            this.responseText = "Gender is a construct, have a look at these settings:";
            this.responseAudioURL = require(`@/assets/audio/gender/gender-${this.vocalTrf.pitch}d-${this.vocalTrf.formant}d.mp3`);
            break;
          case "tall" || "Tall" || "buidling" || "Buidling":
            setTimeout(() => {
              this.richResponseType = "measure";
            }, 300);
            this.responseText = "You'll need to show me which one.";
            this.responseAudioURL = require(`@/assets/audio/measure/measure-${this.vocalTrf.pitch}d-${this.vocalTrf.formant}d.mp3`);
            break;
        }
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
          let settingsURL = require(`@/assets/audio/voice-settings/voice-settings-${i-4}d-${j-4}d.mp3`)
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

.responses {
  position: absolute;
  width: 100%;
  top: 80px;
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
