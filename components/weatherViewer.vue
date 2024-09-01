<template>
  <div class="weather-viewer-container">
    <div class="weather-viewer-main-info">

      <button :class="['weather-viewer-favorite-button', favoritedLocation ? 'unfavorite' : 'favorite']" @click="favoriteLocation">
        <template v-if="favoritedLocation">
          <IconsFavorite class="weather-viewer-favorite-icon" />
          <p>Unfavorite</p>
        </template>
        <template v-else>
          <IconsFavorite class="weather-viewer-favorite-icon" />
          <p>Favotire</p>
        </template>
      </button>
    </div>

    <!-- <p>{{ weatherInformations.current }}</p>
    <p>{{ weatherInformations.forecast }}</p>
    <p>{{ weatherInformations.location }}</p> -->
  </div>
</template>

<script lang="ts" setup>
import { useFavoriteStore } from '~/store';
import type { CurrentLocation, PartialLocation } from '~/types/api/api.interface';

const config = useRuntimeConfig();
const route = useRoute();
const favoriteStore = useFavoriteStore();

const currentLocationParam = computed((): string => {
  const location = route.params.location as string;
  if (+location) {
    return `id:${location}`;
  }

  if (location.length >= 3) {
    return location.replaceAll('_', ', ').replaceAll('-', ' ');
  }

  return location;
});

const currentLocationId = computed((): string => {
  return route.params.location as string;
});

const { data: weatherInformations }: { data: Ref<CurrentLocation> } = await useFetch(`${config.public.baseUrl}/forecast.json `,
  {
    key: `forecast-${route.params.location}`,
    query: {
      key: config.public.apiKey,
      q: currentLocationParam,
      days: 4,
    },
  },
);

const favoritedLocation = computed((): boolean => {
  if (favoriteStore.getAllFavorites.length && currentLocationId.value) {
    return !!favoriteStore.getAllFavorites.find((location: PartialLocation) => location.id === currentLocationId.value);
  }

  return false;
});


const favoriteLocation = (): void => {
  favoriteStore.setFavoriteLocation({...weatherInformations.value.location, id: currentLocationId.value});
};
</script>

<style lang="scss">
.weather-viewer-container {
  .weather-viewer-main-info {
    width: 100%;
    position: relative;
    .weather-viewer-favorite-button {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      right: 0;
      position: absolute;
      padding: $button-padding;
      border-radius: $border-radius;
      border: 1px solid $color-pink;
      font-weight: 600;

      &.favorite {
        background-color: #fcbccf;
        // border-color: #ef215e;
        color: $color-pink;
      }
      &.unfavorite {
        background-color: #ef215e;
      }

      .weather-viewer-favorite-icon {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>