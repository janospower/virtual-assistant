<template>
  <div
   class="home"
   :style="{ backgroundImage: homeBackgroundImage }"
  >
    <!-- <button type="button" @click="heardKeyWord('sun')" name="button">sun</button> -->
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
         v-if="richResponse" >
         <compass></compass>
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
          <speech-to-text @recognized-key-word="heardKeyWord($event)"></speech-to-text>
        </v-squircle>
      </Motion>
    </div>

    <waves :wave-height="waves" v-if="wake"></waves>
  </div>
</template>

<script>
  import SpeechToText from '@/components/speech-to-text.vue'
  import Waves from '@/components/waves.vue'
  import Compass from '@/components/compass.vue'
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
      Compass
    },
    data() {
      return {
        wake: false,
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
        responseText: "",
        responseAudioURL: "",
        responseAudio: null,
        homeBackgroundImage: "var(--img-background)",
        waveMover: null,
      }
    },
    methods: {
      heardKeyWord (keyword) {
        switch (keyword) {
          case "sun" || "sunset":
            this.responseText = "The sun will set right over there at " + this.sunsetStr + ".";
            this.responseAudioURL = require(`@/assets/audio/the-sun-will-set-right-over-there-at-2-past-4-in-the-afternoon--olivia--vocaltrf-${this.vocalTrf.pitch}-${this.vocalTrf.formant}.mp3`);
            this.responseCurrentState = this.responseStates.active;

            setTimeout(() => this.transcriptCurrentState = this.transcriptStates.hidden, 2000);

            this.richResponse = true;
            break;
          case "moon":
            console.log("Mond");
        }
        this.responseAudio = new Audio(this.responseAudioURL);
        this.responseAudio.play();
      },
    },
    created: function () {

      this.getSunInfo(52.5,13.4);

      let _this = this;
      window.addEventListener('message', function(event) {
        if (event.data == "wake") {
          _this.wake = true;
          _this.transcriptCurrentState = _this.transcriptStates.active;
          _this.homeBackgroundImage = "var(--img-background--blurred)";
          _this.beginDetect();
          let counter = 0;
          _this.waveMover = setInterval(function(){
            if (Math.random() > 0.9) {
              _this.waves.splice(counter, 1, 0.1); // Math.random()*1.5
            }
            else {
              _this.waves.splice(counter, 1, _this.vol || 0); // Math.random()*1.5
            }
            counter += 1;
            if (counter > _this.waves.length - 1) {
              counter = 0;
            }
          }, 30);
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
