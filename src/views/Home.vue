<template>
  <div
   class="home"
   :style="{ backgroundImage: homeBackgroundImage }"
  >
    <button type="button" @click="heardKeyWord('voice')" name="button">sun</button>
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
         v-if="richResponse && wake" >
         <compass v-if="richResponseType == 'compass'"></compass>
         <settings v-if="richResponseType == 'voice'"></settings>
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
      Settings
    },
    data() {
      return {
        wake: false,
        listening: false,
        waves: [0,0,0,0,0],
        transcriptStates: {
          hidden: {
            offset: -70,
            opacity: 0
          },
          active: {
            offset: 0,
            opacity: 1
          }
        },
        transcriptCurrentState: {
            offset: -70,
            opacity: 0
        },
        responseStates: {
          hidden: {
            offset: -70,
            opacity: 0
          },
          active: {
            offset: 0,
            opacity: 1
          }
        },
        responseCurrentState: {
            offset: -70,
            opacity: 0
        },
        vocalTrf: {
          pitch: "-2d",
          formant: "-2d"
        },
        richResponse: false,
        richResponseType: "",
        responseText: "",
        responseAudioURL: "",
        responseAudio: null,
        homeBackgroundImage: "var(--img-background)",
        waveMover: null,
      }
    },
    methods: {
      heardKeyWord (keyword) {
        setTimeout(() => {
          this.transcriptCurrentState = this.transcriptStates.hidden;
          this.listening = false;
        }, 1500);

        switch (keyword) {
          case "sun" || "sunset":
            this.richResponseType = "compass";
            this.responseText = "The sun will set right over there at " + this.sunsetStr + ".";

            this.responseAudioURL = require(`@/assets/audio/sun--olivia--vocaltrf-${this.vocalTrf.pitch}-${this.vocalTrf.formant}.mp3`);
            break;
          case "voice" || "sound":
            this.richResponseType = "voice";
            this.responseText = "Gender is a construct, have a look at these voice settings:";
            this.responseAudioURL = require(`@/assets/audio/sun--olivia--vocaltrf-${this.vocalTrf.pitch}-${this.vocalTrf.formant}.mp3`);
            break;
        }
        this.responseCurrentState = this.responseStates.active;
        this.richResponse = true;
        this.responseAudio = new Audio(this.responseAudioURL);
        this.responseAudio.play();
      },
    },
    watch: {
      wake: function (wake) {
         if (!wake) {
           this.transcriptCurrentState = this.transcriptStates.hidden;
           this.responseCurrentState = this.responseStates.hidden;
           this.responseText = "";
           this.homeBackgroundImage = "var(--img-background)";
         }
      }
    },
    created: function () {

      this.getSunInfo(52.5,13.4);

      let _this = this;
      window.addEventListener('message', function(event) {
        if (event.data == "wake") {
          _this.wake = true;
          _this.listening = true;
          _this.transcriptCurrentState = _this.transcriptStates.active;
          _this.homeBackgroundImage = "var(--img-background--blurred)";
          _this.beginDetect();
          _this.moveWaves(_this);
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
