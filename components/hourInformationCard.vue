<template>
  <div class="hour-information-card-container">
    <div>
      {{ getHour() }}
    </div>
    <img :src="hour.condition.icon" />
    <div>
      {{ hour.temp_c }}°
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Hour } from '~/types/api/api.interface';
const props = defineProps({
  hour: {
    type: Object as PropType<Hour>,
    required: true,
  },
});

const getHour = () => {
  return props.hour.time.split(' ')[1];
}
</script>

<style scoped lang="scss">
.hour-information-card-container {
  background-color: $background-primary-color;
  border-radius: $border-radius;
  text-align: center;
  padding: 10px;
}
</style>