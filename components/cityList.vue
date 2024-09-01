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

<style lang="scss">
.city-list-container {
  margin-top: 2rem;
  text-align: center;

  .city-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 28px;
  }

  .city-list-item {
    cursor: pointer;
    font-size: 1.25rem;
    background-color: #cbe7ff;
    border-radius: $border-radius;
    padding: $button-padding;
  }
}

</style>