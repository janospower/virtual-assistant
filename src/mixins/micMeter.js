export default {
  data() {
    return {
      audioContext: null,
      mediaStreamSource: null,
      meter: null,
      vol: 0
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
    }
  }
}
