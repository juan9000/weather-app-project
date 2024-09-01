<template>
  <div>
    <p>{{ weatherInformations.current }}</p>
    <p>{{ weatherInformations.forecast }}</p>
    <p>{{ weatherInformations.location }}</p>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

const currentLocation = computed((): string => {
  const location = route.params.location as string;
  if (+location) {
    return `id:${location}`;
  }

  if (location.length >= 3) {
    return location.replaceAll('_', ', ').replaceAll('-', ' ');
  }

  return location;
});

const { data: weatherInformations } = await useFetch(`${config.public.baseUrl}/forecast.json `,
  {
    key: `forecast-${route.params.location}`,
    query: {
      key: config.public.apiKey,
      q: currentLocation,
      days: 4,
    },
  },
);


</script>

<style>

</style>