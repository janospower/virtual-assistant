<template>
  <div class="waves">
    <Motion
     :value="waveHeight[0]"
      class="wave"
      spring="wobbly"
      tag="div" >
      <svg
      :style="{ transform: `scaleY(${props.value})` }"
      slot-scope="props"
      width="374" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M41 27H0v2h375v-2h-41c-56 0-86-26-146-26S98 27 41 27z" fill="url(#paint0_linear)"/>
        </g>
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="29" x2="375" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E9FF5C" stop-opacity=".3"/>
            <stop offset=".556" stop-color="#E9FF5C"/>
            <stop offset="1" stop-color="#E9FF5C" stop-opacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
    </Motion>

    <Motion
     :value="waveHeight[1]"
      class="wave"
      spring="wobbly"
      tag="div" >
      <svg
      :style="{ transform: `scaleY(${props.value})` }"
      slot-scope="props"
      width="374" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M41 27H0v2h375v-2h-41C208 27 198 1 138 1 88 1 78 27 41 27z" fill="url(#paint1_linear)"/>
        </g>
        <defs>
          <linearGradient id="paint1_linear" x1="0" y1="29" x2="375" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#725CFF" stop-opacity=".3"/>
            <stop offset=".349" stop-color="#725CFF"/>
            <stop offset="1" stop-color="#725CFF" stop-opacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
    </Motion>

    <Motion
     :value="waveHeight[2]"
      class="wave"
      spring="wobbly"
      tag="div" >
      <svg
      :style="{ transform: `scaleY(${props.value})` }"
      slot-scope="props"
      width="374" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M334 27h41v2H0v-2h41C167 27 177 1 237 1c50 0 60 26 97 26z" fill="url(#paint2_linear)"/>
        </g>
        <defs>
          <linearGradient id="paint2_linear" x1="375" y1="29" x2="0" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF5C98" stop-opacity=".3"/>
            <stop offset=".578" stop-color="#FF5C98"/>
            <stop offset="1" stop-color="#FF5C98" stop-opacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
    </Motion>

    <Motion
     :value="waveHeight[3]"
      class="wave"
      spring="wobbly"
      tag="div" >
      <svg
      :style="{ transform: `scaleY(${props.value})` }"
      slot-scope="props"
      width="374" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M41 27H0v2h375v-2h-41C248 27 228 1 158 1 108 1 88 27 41 27z" fill="url(#paint3_linear)"/>
        </g>
        <defs>
          <linearGradient id="paint3_linear" x1="0" y1="29" x2="375" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5CE9FF" stop-opacity=".3"/>
            <stop offset=".458" stop-color="#5CE9FF"/>
            <stop offset="1" stop-color="#5CE9FF" stop-opacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
    </Motion>

    <Motion
     :value="waveHeight[4]"
      class="wave"
      spring="wobbly"
      tag="div" >
      <svg
      :style="{ transform: `scaleY(${props.value})` }"
      slot-scope="props"
      width="374" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M334 27h41v2H0v-2h41c86 0 106-26 176-26 50 0 70 26 117 26z" fill="url(#paint4_linear)"/>
        </g>
        <defs>
          <linearGradient id="paint4_linear" x1="0" y1="29" x2="370" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5CFF72" stop-opacity=".3"/>
            <stop offset=".661" stop-color="#5CFF72"/>
            <stop offset="1" stop-color="#5CFF72" stop-opacity=".3"/>
          </linearGradient>
        </defs>
      </svg>
    </Motion>
  </div>
</template>

<script>
export default {
  name: 'waves',
  props: {
    waveHeight: Array
  },
  mounted() {
    console.log(this.waveHeight);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.waves {
}

.wave {
  position: absolute;
  bottom: -4px;
  mix-blend-mode: overlay;
  left: 0;
  right: 0;
}

svg {
  transform-origin: bottom;
}
</style>
