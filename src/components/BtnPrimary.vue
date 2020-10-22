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
  width: 100%;
  margin-bottom: -13px;
}

</style>
