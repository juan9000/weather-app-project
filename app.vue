<template>
  <div>
    {{ favoriteStore.getState.testValue }}
  </div>
</template>

<script setup lang="ts">
import { useFavoriteStore } from './store';

const favoriteStore = useFavoriteStore();

</script>