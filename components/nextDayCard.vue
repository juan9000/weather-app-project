<template>
  <div class="next-day-card-container">
    <MainSubtext
      :main="getWeekDay()"
      :sub="getDayMonth()"
    />
    <img :src="forecastDay.day.condition.icon">
    <MainSubtext
      :main="`${forecastDay.day.mintemp_c}°`"
      sub="Low"
    />
    <MainSubtext
      :main="`${forecastDay.day.maxtemp_c}°`"
      sub="High"
    />
    <MainSubtext
      :main="`${forecastDay.day.daily_chance_of_rain}%`"
      sub="Rain"
    />
    <MainSubtext
      :main="`${forecastDay.day.maxwind_mph}mph`"
      sub="Wind"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ForecastDay } from '~/types/api/api.interface';

const props = defineProps({
  forecastDay: {
    type: Object as PropType<ForecastDay>,
    required: true,
  }
});

const date = ref(new Date(props.forecastDay.date));

const getWeekDay = (): string => {
  return daysOfWeekAbbreviation[date.value.getDate()];
}

const getDayMonth = (): string => {
  const month = (date.value.getMonth() + 1).toLocaleString().padStart(2, "0");
  const day = date.value.getDay().toLocaleString().padStart(2, "0");
  return `${day}/${month}`;
}
</script>

<style scoped lang="scss">
.next-day-card-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: $background-primary-color;
  border-radius: $border-radius;
}
</style>