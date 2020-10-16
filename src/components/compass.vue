<template>
  <div class="compass" @mousemove="rotateCompass">
    <svg-injector :class-name="'js-svg-injector'" :src="require('@/assets/compass/marks.svg')"></svg-injector>
  </div>
</template>

<script>
export default {
  name: 'compass',
  props: {

  },
  methods: {
    rotateCompass (event) {
      let angle = event.clientX + event.clientY + "deg";
      document.querySelector('#compass--rotate').style.transform = "rotate(" + angle + ")";
      document.querySelector('#compass--info').style.transform = "rotate(-" + angle + ")";
      document.querySelector('#compass--N').style.transform = "rotate(-" + angle + ")";
      document.querySelector('#compass--E').style.transform = "rotate(-" + angle + ")";
      document.querySelector('#compass--S').style.transform = "rotate(-" + angle + ")";
      document.querySelector('#compass--W').style.transform = "rotate(-" + angle + ")";
    }
  },
  mounted() {
    console.log(1);
  }
}
</script>

<style>
#compass--rotate,
#compass--rotate-reverse > * {
  transform-origin: center;
}
#compass--rotate-reverse > * {
  transform-box: fill-box;
}
</style>
