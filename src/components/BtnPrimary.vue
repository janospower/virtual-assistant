<template>
  <div class="btn">
    <div class="btn-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'btn-primary'
}
</script>

<style>

.btn {
  line-height: 44px;
  text-align: center;
  margin-bottom: -13px;
  margin-left: -13px;
  margin-right: -13px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 0 0 11px 11px;
  transition: all .2s ease;
}

.btn:active {
  background-color: hsla(0, 0%, 100%, 0.07);
  color: hsla(0, 0%, 100%, 0.1) !important;
}

</style>
