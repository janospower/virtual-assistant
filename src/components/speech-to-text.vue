<template>
  <p class="mb-0">
    <span v-if="sentences.length > 0" >
      <span v-for="sentence in sentences" v-bind:key="sentence" class="sentence sentence-final">{{sentence}}?</span>
    </span>
    <span class="sentence sentence-preliminary">
      {{runtimeTranscriptionOld}}<em>{{lastWord}}</em>
    </span>
  </p>
</template>

<script>
  export default {
    name: 'speech-to-text',
    props: {
      lang: {
        type: String,
        default: 'en-US'
      },
      text: {
        type: [String, null],
        required: false
      }
    },
    data () {
      return {
        error: false,
        speaking: false,
        toggle: false,
        runtimeTranscription: '',
        runtimeTranscriptionOld: '',
        lastWord: '',
        sentences: [],
        keyWords: [
          "sun",
          "sunset",
          "voice",
          "Voice",
          "Sun",
          "Sunset",
          "sound",
          "tall",
          "Tall",
          "building",
          "Building"
        ]
      }
    },
    created: function () {
      let _this = this;
      this.startSpeechRecognition();
      window.addEventListener('message', function(event) {
        if (event.data == "sleep") {
          _this.endSpeechRecognition();
        }
      });
    },
    methods: {
      checkCompatibility () {
        if (!recognition) {
          this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
        }
      },
      endSpeechRecognition () {
        recognition.stop()
        this.toggle = false
        this.$emit('speechend', {
          sentences: this.sentences,
          text: this.sentences.join('. '),
        })
      },
      startSpeechRecognition () {
        if (!recognition) {
          this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox'
          return false
        }
        this.toggle = true
        recognition.lang = this.lang
        recognition.interimResults = true

        recognition.addEventListener('speechstart', event => {
          this.event = event;
          this.speaking = true
        })

        recognition.addEventListener('speechend', event => {
          this.event = event;
          this.speaking = false;
        })

        recognition.addEventListener('result', event => {
          const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript)
          this.runtimeTranscription = text.join('');
          this.runtimeTranscriptionOld = text[0];
          this.lastWord = text[1];
        })

        recognition.addEventListener('end', () => {
          if (this.runtimeTranscription !== '') {
            this.sentences.push(this.runtimeTranscription);
            this.$emit('update:text', `${this.text}${this.sentences.slice(-1)[0]}. `);
            let transcript = this.sentences.slice(-1)[0];
            for (var i = 0; i < this.keyWords.length; i++) {
              if ( transcript.includes(this.keyWords[i]) ) {
                this.$emit('recognized-key-word', this.keyWords[i]);
              }
            }
          }
          this.runtimeTranscription = ''
          this.runtimeTranscriptionOld = ''
          this.lastWord = ''
          recognition.stop()
          if (this.toggle) {
            // keep it going.
            recognition.start()
          }
        })
        recognition.start()
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
    },
    mounted () {
      this.checkCompatibility()
    }
  };
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = SpeechRecognition? new SpeechRecognition() : false
</script>

<style scoped>
.sentence {
  display: block;
}

.sentence:first-letter {
  text-transform: uppercase;
}

em {
  font-style: normal;
  color: hsla(0, 0%, 0%, 0.2);
}
</style>
