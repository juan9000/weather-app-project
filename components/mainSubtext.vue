<template>
  <div class="main-subtext">
    <div class="main-subtext-main">
      {{ main }}
    </div>
    <div class="main-subtext-sub">
      {{ sub }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  main: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  }
})
</script>

<style scoped lang="scss">
.main-subtext {
  text-align: center;
  align-content: center;
  color: $text-color-white;

  .main-subtext-main {
    font-weight: 600;
  }

  .main-subtext-sub {
    margin-top: 0.15rem;
  }
}
</style>