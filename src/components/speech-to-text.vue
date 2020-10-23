<template>
  <p class="mb-0">
    <span v-if="sentences.length > 0" class="container">
      <span v-for="sentence in sentences" v-bind:key="sentence" class="sentence sentence-final">{{sentence}}? </span>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.55831 0.649902C1.07583 0.649902 0.650024 1.00837 0.650024 1.5241C0.650024 1.76978 0.754792 1.98913 0.912341 2.1463L0.917467 2.15142L5.10833 5.9999L0.917467 9.84839L0.912341 9.8535C0.756366 10.0091 0.650024 10.2222 0.650024 10.4757C0.650024 10.9914 1.07583 11.3499 1.55831 11.3499C1.80092 11.3499 2.02247 11.2681 2.20121 11.101L7.05892 6.63783L7.06169 6.63524C7.23619 6.4714 7.35002 6.25649 7.35002 5.9999C7.35002 5.74964 7.24119 5.52518 7.05716 5.36037L2.20022 0.892049L2.19543 0.887804C2.019 0.731347 1.80072 0.649902 1.55831 0.649902Z" fill="currentColor"/>
      </svg>
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
          "Building",
          "eat",
          "Eat",
          "allergic",
          "chocolate"
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

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sentence {
  display: block;
}

.sentence:first-letter {
  text-transform: uppercase;
}

svg {
  display: inline-block;
  color: hsla(0, 0%, 100%, 0.2);
}

em {
  font-style: normal;
  color: hsla(0, 0%, 0%, 0.2);
}
</style>
