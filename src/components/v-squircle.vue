<template lang="html">
  <div class="v-squircle" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "v-squircle",
  props: {
    radius: {
      type: String,
      default: '10px'
    },
    padding: {
      type: String,
      default: '10px'
    }
  },
  data() {
    return {
      polygon: []
    }
  },
  methods: {
    squircle(radius) {
      return function (theta) {
        let x = Math.pow(Math.abs(Math.cos(theta)), 2 / radius) * 50 * Math.sign(Math.cos(theta)) + 50;
        let y = Math.pow(Math.abs(Math.sin(theta)), 2 / radius) * 50 * Math.sign(Math.sin(theta)) + 50;
        return {x,y};
      }
    },
    to_radians(deg) {
      return deg * Math.PI / 180;
    }
  },
  mounted() {
    this.polygon = (new Array(360))
     .fill(0)
     .map((x, i) => i)
     .map(this.to_radians) // Defined as deg => deg * Math.PI / 180 elsewhere
     .map(this.squircle(4)) // We'll use a border-radius of 4
     .map(({ x, y }) => ({ x: Math.round(x * 10)/10, y: Math.round(y * 10)/10 })) // Round to the ones place
     .map(({ x, y }) => `${x}% ${y}%`)
     .join(', ');
  },
  computed: {
    style () {
      return{
        '--v-squircle-radius': this.radius,
        '--v-squircle-padding': this.padding,
        '--v-squircle-polygon': 'polygon(' + this.polygon + ')'
      }
    }
  }
};
//  from https://medium.com/@zubryjs/squircles-bringing-ios-7s-solution-to-rounded-rectangles-to-css-9fc35779aa65
</script>

<style lang="css" scoped>
.v-squircle {
  background-color: red;
  padding: var(--v-squircle-padding);
  clip-path: var(--v-squircle-polygon);
}
</style>
