<template>
  <div class="list-item">
    <div class="list-item-content">
      <span>{{sliderLabelLeft}}</span>
      <span>{{sliderLabelRight}}</span>
    </div>
    <vue-slider v-model="value" v-bind="options"></vue-slider>
    <hr class="hr" :class="{'hr--full': lastInBlock}">
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    sliderLabelLeft: String,
    sliderLabelRight: String,
    lastInBlock: Boolean
  },
  data() {
    return {
      value: 0,
      options: {
        dotSize: 28,
        width: 'auto',
        height: 4,
        contained: false,
        direction: 'ltr',
        data: null,
        dataLabel: 'label',
        dataValue: 'value',
        min: -4,
        max: 4,
        interval: 1,
        disabled: false,
        clickable: false,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'none',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      }
    }
  },
  watch: {
    value: function (value) {
       this.$emit('value-changed', value);
    }
  }
}
</script>

<style>

.hr {
  margin-right: -13px;
  margin-top: 0;
}

.vue-slider {
  margin-bottom: 6px;
}

.vue-slider-process {
  background-color: var(--color-blue)!important;
}

.vue-slider-rail {
  background-color: hsla(222, 100%, 90%, 0.13)!important;
}

.vue-slider-dot-handle {
  box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.12), 0px 6px 13px rgba(0, 0, 0, 0.12) !important;
}

.vue-slider-dot-handle, .vue-slider-dot {
  cursor: none!important;
}

</style>
