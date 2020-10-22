<template>
  <div class="settings">
    <caption>Voice Settings</caption>
    <hr class="hr--full">
    <list-item
     property-name="Language"
     setting-name="English (United States)">
    </list-item>
    <list-item
     property-name="Voice"
     setting-name="Ezra (Neutral)"
     :lastInBlock="true">
    </list-item>


    <div class="settings-block">
      <caption>Vocal Character</caption>
      <hr class="hr--full">
      <slider
       slider-label-left="Low"
       slider-label-right="High"
       :lastInBlock="true">
      </slider>
      <slider
       slider-label-left="Dark"
       slider-label-right="Bright"
       :lastInBlock="true">
      </slider>
    </div>

    <btn-primary>Open Settings …</btn-primary>

  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import Slider from '@/components/Slider.vue'
import BtnPrimary from '@/components/BtnPrimary.vue'
export default {
  name: 'settings',
  components: {
    ListItem,
    Slider,
    BtnPrimary
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style>

.hr--full {
  margin-right: -13px;
  margin-left: -13px;
}

.settings-block {
  margin-top: 20px;
}

</style>
