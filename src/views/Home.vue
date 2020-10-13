<template>
  <div class="home">
    <transition name="transcript" appear>
      <Motion
       :value="offset"
       tag="div"
       spring="gentle"
       data-cursor-hover >
        <v-squircle
         radius="20px"
         padding="12px"
         v-if="wake"
         slot-scope="props"
         :style="{ transform: `translateY(${props.value}px)` }" >
          <speech-to-text></speech-to-text>
        </v-squircle>
      </Motion>
    </transition>
    <waves :wave-height="waves" v-if="wake"></waves>
  </div>
</template>

<script>
  import SpeechToText from '@/components/speech-to-text.vue'
  import Waves from '@/components/waves.vue'
  export default{
    components: {
      SpeechToText,
      Waves
    },
    data() {
      return {
        wake: false,
        waves: [0,0,0,0,0],
        offset: 70,
        audioContext: null,
        mediaStreamSource: null,
        meter: null,
        vol: 0,
        waveMover: null,
      }
    },
    methods: {
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
      let _this = this;
      window.addEventListener('message', function(event) {
        if (event.data == "wake") {
          _this.wake = true;
          _this.offset = 0;
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


.transcript-enter-active,
.transcript-leave-active {
  transition: opacity 0.4s linear;
}

.transcript-enter,
.transcript-leave-to {
  opacity: 0;
}
</style>
