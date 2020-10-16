<template>
  <div
   class="home"
   :style="{ backgroundImage: homeBackgroundImage }"
  >
    <!-- <button type="button" @click="heardKeyWord('sun')" name="button">sun</button> -->
    <v-squircle
     class="transcripts"
     radius="20px"
     padding="13px"
     data-cursor-hover >
     <compass></compass>
    </v-squircle>
    <transition name="response" appear>
      <Motion
       :value="offsetResponse"
       tag="div"
       spring="gentle"
       data-cursor-hover >
        <v-squircle
         class="responses"
         radius="20px"
         padding="12px"
         v-if="offsetResponse != -70"
         slot-scope="props"
         :style="{ transform: `translateY(${props.value}px)` }" >
          {{responseText}}
        </v-squircle>
      </Motion>
    </transition>
    <transition name="transcript" appear>
      <Motion
       :value="offsetTranscript"
       tag="div"
       spring="gentle"
       data-cursor-hover >
        <v-squircle
         class="transcripts"
         radius="20px"
         padding="12px"
         v-if="wake"
         slot-scope="props"
         :style="{ transform: `translateY(${props.value}px)` }" >
          <speech-to-text @recognized-key-word="heardKeyWord($event)"></speech-to-text>
        </v-squircle>
      </Motion>
    </transition>
    <waves :wave-height="waves" v-if="wake"></waves>
  </div>
</template>

<script>
  import SpeechToText from '@/components/speech-to-text.vue'
  import Waves from '@/components/waves.vue'
  import Compass from '@/components/compass.vue'
  export default{
    components: {
      SpeechToText,
      Waves,
      Compass
    },
    data() {
      return {
        wake: false,
        waves: [0,0,0,0,0],
        offsetTranscript: 70,
        offsetResponse: -70,
        responseText: "Hellos",
        responseAudioURL: "",
        responseAudio: null,
        homeBackgroundImage: "var(--img-background)",
        audioContext: null,
        mediaStreamSource: null,
        meter: null,
        vol: 0,
        waveMover: null,
        SunCalc: null,
        sunsetStr: "",
        sunsetAzimuth: "",
      }
    },
    methods: {
      heardKeyWord (keyword) {
        switch (keyword) {
          case "sun" || "sunset":
            this.responseText = "The sun will set right over there at " + this.sunsetStr + ".";
            this.responseAudioURL = require("@/assets/audio/the-sun-will-set-right-over-there-at-2-past-4-in-the-afternoon--olivia--vocaltrf--2d--2d.mp3");
            this.offsetResponse = 0;
            break;
          case "moon":
            console.log("Mond");
        }
        this.responseAudio = new Audio(this.responseAudioURL);
        this.responseAudio.play();
      },
      getSunInfo (long, lat) {
        this.SunCalc = require('suncalc');
        // get today's sunlight times for London
        let times = this.SunCalc.getTimes(new Date(), long, lat);

        // format sunset time from the Date object
        this.sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

        // get position of the sun (azimuth and altitude) at today's sunset
        let sunsetPos = this.SunCalc.getPosition(times.sunset, long, lat);

        // get sunset azimuth in degrees
        let direction = Math.round((sunsetPos.azimuth * 180 / Math.PI)+180);
        this.sunsetAzimuth = direction + "º " + this.getCardinal(direction);
      },
      getCardinal(angle) {
        const degreePerDirection = 360 / 8;
        const offsetAngle = angle + degreePerDirection / 2;
        return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
          : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
            : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
              : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
                : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                  : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                    : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                      : "NW";
      },
      createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
        const processor = audioContext.createScriptProcessor(512)
        processor.onaudioprocess = this.volumeAudioProcess
        processor.volume = 0
        processor.averaging = averaging || 0.95
        processor.clipLag = clipLag || 750

        // this will have no effect, since we don't copy the input to the output,
        // but works around a current Chrome bug.
        processor.connect(audioContext.destination)

        processor.shutdown = function () {
          this.disconnect()
          this.onaudioprocess = null
        }

        return processor
      },
      beginDetect() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
            this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
            this.meter = this.createAudioMeter(this.audioContext)
            this.mediaStreamSource.connect(this.meter)
          })
        }
      },
      volumeAudioProcess(event) {
        const buf = event.inputBuffer.getChannelData(0)
        const bufLength = buf.length
        let sum = 0
        let x
        let _this = event.currentTarget;

        // Do a root-mean-square on the samples: sum up the squares...
        for (var i = 0; i < bufLength; i++) {
          x = buf[i]
          sum += x * x
        }

        // ... then take the square root of the sum.
        const rms = Math.sqrt(sum / bufLength)

        // Now smooth this out with the averaging factor applied
        // to the previous sample - take the max here because we
        // want "fast attack, slow release."
        _this.volume = Math.max(rms, _this.volume * _this.averaging)

        this.vol = Math.max(0,Math.log10(_this.volume * 1000 - 2)/2);
      },
    },
    created: function () {

      this.getSunInfo(52.5,13.4);

      let _this = this;
      window.addEventListener('message', function(event) {
        if (event.data == "wake") {
          _this.wake = true;
          _this.offsetTranscript = 0;
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

.transcripts {
  bottom: 80px;
}

.transcripts >>> .v-squircle--slot {
  background-position-y: bottom;
}

.responses {
  top: 80px;
}

.responses >>> .v-squircle--slot {
  background-position-y: top;
}

.transcript-enter-active,
.transcript-leave-active,
.response-enter-active,
.response-leave-active {
  transition: opacity .4s linear;
}

.transcript-enter,
.transcript-leave-to,
.response-enter,
.response-leave-to {
  opacity: 0;
}
</style>
