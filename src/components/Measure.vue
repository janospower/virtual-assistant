<template>
  <div class="measure">
    <transition name="dissolve" appear>
      <div class="prompt" v-if="!camera">
        <div class="camera">
          <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <pattern id="measure--background" patternUnits="userSpaceOnUse" width="332" height="332">
                  <image :href="require('@/assets/ios14-background-day--square.png')" x="-140" y="-210" width="332" height="332"/>
              </pattern>
          </defs>
          <path id="camera" fill-rule="evenodd" clip-rule="evenodd" d="M50.9727 16.8789C52.0664 16.8789 52.668 16.25 52.668 15.1562V8.12891C52.668 2.87891 49.9336 0.144531 44.6016 0.144531H37.5742C36.4805 0.144531 35.8516 0.746094 35.8516 1.83984C35.8516 2.90625 36.4805 3.53516 37.5742 3.53516H44.5195C47.5547 3.53516 49.2773 5.14844 49.2773 8.32031V15.1562C49.2773 16.25 49.8789 16.8789 50.9727 16.8789ZM2.02734 16.8789C3.12109 16.8789 3.72266 16.25 3.72266 15.1562V8.32031C3.72266 5.14844 5.39062 3.53516 8.45312 3.53516H15.3984C16.5195 3.53516 17.1211 2.90625 17.1211 1.83984C17.1211 0.746094 16.5195 0.144531 15.3984 0.144531H8.39844C3.06641 0.144531 0.332031 2.85156 0.332031 8.12891V15.1562C0.332031 16.25 0.933594 16.8789 2.02734 16.8789ZM14.0586 38.6172H38.9688C41.6484 38.6172 43.0703 37.25 43.0703 34.543V19.9141C43.0703 17.207 41.6484 15.8125 38.9688 15.8125H35.1406C34.0469 15.8125 33.7188 15.6758 33.0352 14.9102L31.8594 13.625C31.1211 12.832 30.5195 12.5039 29.125 12.5039H23.6562C22.3164 12.5039 21.6328 12.832 20.9219 13.625L19.7461 14.9102C19.0898 15.6484 18.7617 15.8125 17.6406 15.8125H14.0586C11.3242 15.8125 9.92969 17.207 9.92969 19.9141V34.543C9.92969 37.25 11.3242 38.6172 14.0586 38.6172ZM26.5273 35.2812C21.9883 35.2812 18.3242 31.6719 18.3242 27.0781C18.3242 22.5117 21.9883 18.875 26.5273 18.875C31.0664 18.875 34.7031 22.5117 34.7031 27.0781C34.7031 31.7266 31.0664 35.2812 26.5273 35.2812ZM37.4648 23.1406C36.5352 23.1406 35.7695 22.4023 35.7695 21.4453C35.7695 20.5156 36.5352 19.75 37.4648 19.75C38.3945 19.75 39.1055 20.5156 39.1328 21.4453C39.1328 22.4023 38.3945 23.1406 37.4648 23.1406ZM26.5 33.3398C29.9453 33.3398 32.7617 30.5508 32.7617 27.0781C32.7617 23.6055 29.9453 20.8164 26.5 20.8164C23.0547 20.8164 20.2656 23.6055 20.2656 27.0781C20.2656 30.5508 23.0547 33.3398 26.5 33.3398ZM8.39844 52.4805H15.3984C16.5195 52.4805 17.1211 51.8516 17.1211 50.7852C17.1211 49.6914 16.5195 49.0898 15.3984 49.0898H8.45312C5.39062 49.0898 3.72266 47.4492 3.72266 44.3047V37.4688C3.72266 36.375 3.12109 35.7461 2.02734 35.7461C0.90625 35.7461 0.332031 36.375 0.332031 37.4688V44.4688C0.332031 49.7734 3.06641 52.4805 8.39844 52.4805ZM37.5742 52.4805H44.6016C49.9336 52.4805 52.668 49.7461 52.668 44.4688V37.4688C52.668 36.375 52.0391 35.7461 50.9727 35.7461C49.8516 35.7461 49.2773 36.375 49.2773 37.4688V44.3047C49.2773 47.4492 47.5547 49.0898 44.5195 49.0898H37.5742C36.4805 49.0898 35.8516 49.6914 35.8516 50.7852C35.8516 51.8516 36.4805 52.4805 37.5742 52.4805Z" fill="url(#measure--background)"/>
          </svg>

        </div>
        <hr class="hr--full">
        <btn-primary @click.native="camera = true">Allow camera to measure</btn-primary>
      </div>
    </transition>


      <transition name="dissolve" appear>
        <div class="viewfinder" v-if="camera">
          <Motion
           :values="shift"
           tag="div"
           :spring="spring"
           data-cursor-hover >
           <img
            @mousemove="imgShift"
            :src="require('@/assets/photos/building.png')"
            draggable='false'
            ondragstart="return false;"
            slot-scope="_shift"
            :style="{ transform: `translate(${_shift.longitude}px, ${_shift.altitude}px)` }">
         </Motion>

         <div class="length">
           {{length}}
           <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M1.55831 0.649902C1.07583 0.649902 0.650024 1.00837 0.650024 1.5241C0.650024 1.76978 0.754792 1.98913 0.912341 2.1463L0.917467 2.15142L5.10833 5.9999L0.917467 9.84839L0.912341 9.8535C0.756366 10.0091 0.650024 10.2222 0.650024 10.4757C0.650024 10.9914 1.07583 11.3499 1.55831 11.3499C1.80092 11.3499 2.02247 11.2681 2.20121 11.101L7.05892 6.63783L7.06169 6.63524C7.23619 6.4714 7.35002 6.25649 7.35002 5.9999C7.35002 5.74964 7.24119 5.52518 7.05716 5.36037L2.20022 0.892049L2.19543 0.887804C2.019 0.731347 1.80072 0.649902 1.55831 0.649902Z" fill="#000000"/>
           </svg>
         </div>

         <div class="circle">
           <div class="circle-inner">
           </div>
           <Motion
            :value="circ"
            tag="div"
            spring="wobbly"
            data-cursor-hover >
              <div
               class="circle-outer"
               slot-scope="circ"
               :style="{transform: `scale(${circ.value})`}">
              </div>
            </Motion>
         </div>


         <Motion
          :values="shift"
          tag="div"
          :spring="spring"
          data-cursor-hover >
           <svg
            slot-scope="_shift"
            class="line"
            width="359"
            height="359"
            viewBox="0 0 359 359" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line :x1="_shift.longitude+370" :y1="_shift.altitude+1200" x2="50%" y2="50%" stroke="var(--color-yellow)" stroke-width="1.5"/>
          </svg>
        </Motion>

        <div class="buttons">
          <div class="button button-1">
            <svg-injector :class-name="'js-svg-injector'" :src="require('@/assets/sf-symbols/back.svg')"></svg-injector>
          </div>
          <div class="buttons-right">
            <div class="button button-2">
              <svg-injector :class-name="'js-svg-injector'" :src="require('@/assets/sf-symbols/share.svg')"></svg-injector>
            </div>
            <div class="button button-3">
              <svg-injector :class-name="'js-svg-injector'" :src="require('@/assets/sf-symbols/full.svg')"></svg-injector>
            </div>
          </div>
        </div>

        </div>
      </transition>
  </div>
</template>

<script>
import BtnPrimary from '@/components/BtnPrimary.vue'
export default {
  name: 'measure',
  components: {
    BtnPrimary
  },
  data() {
    return {
      camera: false,
      shift: {
        altitude: -510,
        longitude: -180
      },
      centerY: 0,
      centerX: 0,
      circ: 1,
      spring: {
        stiffness: 200,
        damping: 100,
        precision: 0.01,
      },
      length: "0 m",
    }
  },
  methods: {
    imgShift(event) {
      let alt = ((event.clientY - this.centerY) * 1.5 + 510) * -1;
      let long = ((event.clientX - this.centerX) * 1.5 + 180) * -1;
      this.shift = {
        altitude: alt,//event.clientY - this.centerY) * -1,
        longitude: long//event.clientX - this.centerX) * -1
      }
      if ( -450 < alt && alt < -410 && -170 < long && long < -130 ) {
        this.circ = .7;
      }
      else {
        this.circ = 1;
      }

      this.length = Math.round(Math.sqrt( Math.abs((180-(long+370))*180 + (180-(alt+1200))*180) )) + " m";
    }
  },
  mounted() {
    const viewBox = document.querySelector('.measure');
    this.centerY = viewBox.getBoundingClientRect().top + viewBox.getBoundingClientRect().height / 2;
    this.centerX = viewBox.getBoundingClientRect().left + viewBox.getBoundingClientRect().width / 2;
  }
}
</script>

<style>

.buttons {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.button {
  background-color: var(--color-background-blurred);
  border-radius: 9px;
  backdrop-filter: saturate(180%) blur(20px);
  height: 100%;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons-right {
  display: flex;
}

.button svg {
  opacity: 0.7;
}

.button-2 {
  margin-right: 1px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.button-3 {
  margin-right: 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.hr--full {
  margin-right: -13px;
  margin-left: -13px;
}

.measure {
  height: 333px;
}

.prompt {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.camera {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewfinder {
  height: 359px;
  width: 359px;
  top: 0px;
  left: 8px;
  position: absolute;
  /* border-radius: 10px; */
  clip-path: inset(0px 0px round 10px 10px);
  overflow: hidden;
  backface-visibility: hidden;
}

.viewfinder img {
  width: 200%;

  backface-visibility: hidden;
  will-change: filter;
  transition-delay: .8s !important;
  filter: blur(0px);
  transition: filter .4s ease;
  user-select: none;
}

.length {
  position: absolute;
  top: 8px;
  left: calc( 50% - 45px );
  width: 90px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: black;
  background-color: var(--color-yellow);
  border-radius: 12px;
}

.length svg {
  display: inline;
  margin-left: 6px;
  opacity: .5;
}

.circle {
  width: 72px;
  height: 72px;
  position: absolute;
  top: calc( 50% - 36px );
  left: calc( 50% - 36px );
  pointer-events: none;
}

.circle-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  top: calc( 50% - 3px );
  left: calc( 50% - 3px );
  background-color: var(--color-yellow);
}

.circle-outer {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid rgba(255, 204, 0, 0.5);
}

.line {
  position: absolute;
  top: 0;
  pointer-events: none;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity .4s ease;
}

.dissolve-enter,
.dissolve-leave-to {
  opacity: 0;
}

.dissolve-enter img,
.dissolve-leave-to img {
  filter: blur(40px);
}

</style>
