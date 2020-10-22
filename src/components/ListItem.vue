<template>
  <div class="list-item">
    <div class="list-item-content">
      <span>{{propertyName}}</span>
      <span>{{settingName}}
        <svg-injector :class-name="'js-svg-injector'" :src="require('@/assets/sf-symbols/arrow.svg')"></svg-injector>
      </span>
    </div>
    <hr class="hr" :class="{'hr--full': lastInBlock}">
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    propertyName: String,
    settingName: String,
    lastInBlock: Boolean
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

.hr {
  margin-right: -13px;
  margin-top: 0;
}

.list-item {
  font-weight: var(--font-weight--regular);
  line-height: 41px;
}

.list-item-content {
  display: flex;
  justify-content: space-between;
}

.list-item-content div {
  display: inline;
  padding-left: 6px;
}

</style>
