<template>
  <div class="food">
      <div class="prompt" v-if="!camera">
        <btn-primary>Review dietary profile</btn-primary>
        <hr class="hr--full">
        <btn-primary>Enter manually</btn-primary>
        <hr class="hr--full">
        <btn-primary @click.native="camera = true">Allow camera to check ingredients</btn-primary>
      </div>


    <transition name="dissolve" appear>
      <div class="viewfinder-wrapper" v-if="camera">
        <div class="viewfinder">
          <Motion
           :values="shift"
           :spring="spring"
           data-cursor-hover >
           <img
            @mousemove="imgShift"
            :src="require('@/assets/photos/chocolate.png')"
            draggable='false'
            ondragstart="return false;"
            slot-scope="_shift"
            :style="{ transform: `translate(${_shift.longitude}px, ${_shift.altitude}px)` }">
           </Motion>

           <Motion
            :values="shift"
            spring="gentle"
            data-cursor-hover >

             <div
              slot-scope="_shift"
              class="bracket"
              :style="{ transform: `translate(${_shift.longitude+173}px, ${_shift.altitude+468}px)` }"
             >
               <div class="bracket-inner">
                 <Motion
                  :value="bracketSize"
                  spring="wobbly"
                  data-cursor-hover >
                    <div
                     class="bracket-outer"
                     slot-scope="bracketSize"
                     :style="{transform: `scale(${bracketSize.value})`}">
                      <svg class="top-left" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2549 10.2549H7.69488C5.41692 10.2549 4.27794 10.2549 3.41099 9.80454C2.68041 9.42503 2.08473 8.82935 1.70523 8.09878C1.25488 7.23183 1.25488 6.09285 1.25488 3.81488V0.254883" stroke="currentColor" stroke-width="1.5"/>
                      </svg>

                      <svg class="top-right" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2549 10.2549H7.69488C5.41692 10.2549 4.27794 10.2549 3.41099 9.80454C2.68041 9.42503 2.08473 8.82935 1.70523 8.09878C1.25488 7.23183 1.25488 6.09285 1.25488 3.81488V0.254883" stroke="currentColor" stroke-width="1.5"/>
                      </svg>

                      <svg class="bottom-left" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2549 10.2549H7.69488C5.41692 10.2549 4.27794 10.2549 3.41099 9.80454C2.68041 9.42503 2.08473 8.82935 1.70523 8.09878C1.25488 7.23183 1.25488 6.09285 1.25488 3.81488V0.254883" stroke="currentColor" stroke-width="1.5"/>
                      </svg>

                      <svg class="bottom-right" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.2549 10.2549H7.69488C5.41692 10.2549 4.27794 10.2549 3.41099 9.80454C2.68041 9.42503 2.08473 8.82935 1.70523 8.09878C1.25488 7.23183 1.25488 6.09285 1.25488 3.81488V0.254883" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                   </div>
                  </Motion>

              </div>
             </div>
          </Motion>

          <div class="buttons">
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
  name: 'food',
  components: {
    BtnPrimary
  },
  data() {
    return {
      camera: false,
      shift: {
        altitude: -173,
        longitude: -290
      },
      centerY: 0,
      centerX: 0,
      bracketSize: 1,
      spring: {
        stiffness: 200,
        damping: 100,
        precision: 0.01,
      }
    }
  },
  methods: {
    imgShift(event) {
      let alt = ((event.clientY - this.centerY) * 1 + 200) * -1;
      let long = ((event.clientX - this.centerX) * 1 + 180) * -1;
      this.shift = {
        altitude: alt,
        longitude: long
      }

      let threshold;
      if (-106 < long && long < 34 && -413 < alt && alt < -273) {
        this.bracketSize = 1.2;
        let _this = this;
        threshold = setTimeout(function(){
          _this.$emit('barcode',true);
        }, 500);
      }
      else {
        this.bracketSize = 1;
        clearTimeout(threshold);
      }
    }
  },
  mounted() {
    const viewBox = document.querySelector('.food');
    this.centerY = viewBox.getBoundingClientRect().top + viewBox.getBoundingClientRect().height / 2;
    this.centerX = viewBox.getBoundingClientRect().left + viewBox.getBoundingClientRect().width / 2;
  }
}
</script>

<style scoped>

.bracket {
  color: var(--color-yellow);
  width: 110px;
  height: 40px;
  position: absolute;
  top: 50px;
  left: 50px;
  pointer-events: none;
}

.bracket svg {
  position: absolute;
}

.bracket-inner {
  transform: rotate(84deg);
  width: 110px;
  height: 40px;
}

.bracket-outer {
  transform: scale(1);
  width: 110px;
  height: 40px;
}

.bracket span {
  width: 100%;
  height: 100%;
}

.top-left {
  top: 0;
  left: 0;
  transform: rotate(90deg);
}

.top-right {
  top: 0;
  right: 0;
  transform: rotate(180deg);
}

.bottom-left {
  bottom: 0;
  left: 0;
  transform: rotate(0deg);
}

.bottom-right {
  bottom: 0;
  right: 0;
  transform: rotate(270deg);
}

.buttons {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 44px;
  display: flex;
  justify-content: flex-end;
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
  pointer-events: none;
}

.button svg {
  opacity: 0.7;
}

.hr--full {
  margin-top: 13px;
}

.food {

}

.viewfinder-wrapper {
  height: 333px;
  transition: height .4s ease;
}

.prompt {
  margin-top: -13px;
  display: flex;
  flex-direction: column;
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

.dissolve-enter-active,
.dissolve-leave-active {
  transition: all .4s ease;
}

.dissolve-enter,
.dissolve-leave-to {
  opacity: 0;
  height: 0px;
}

.dissolve-enter img,
.dissolve-leave-to img {
  filter: blur(40px);
}

</style>
