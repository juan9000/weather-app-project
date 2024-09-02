<template>
  <div
    v-if="favoriteStore.getAllFavorites.length"
    class="city-list-container"
  >
    <h2 class="city-list-title">Favorited Cities</h2>
    <div class="city-list">
      <button
        v-for="location in favoriteStore.getAllFavorites"
        class="city-list-item"
        @click="navigateTo(`/${location.id}`)"
      >
        {{ `${location.name}, ${location.country}` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from '~/store';

const favoriteStore = useFavoriteStore();
</script>

<style scoped lang="scss">
.city-list-container {
  margin-top: 2rem;
  text-align: center;
  color: $text-color-white;

  .city-list-title {
    margin-bottom: 0.75rem;
  }

  .city-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;

    .city-list-item {
      cursor: pointer;
      font-size: 1.25rem;
      background-color: rgb(8 9 35 / 22%);
      border-radius: $border-radius;
      padding: $button-padding;
      color: $text-color-white;
    }
  }
}


@media only screen and (min-width: 768px) {
  .city-list-container {
    .city-list {
      gap: 28px;
    }
  }
}
</style>