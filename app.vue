<template>
  <div>
    {{ response }}
  </div>
</template>

<script setup lang="ts">
import useApi from './composables/useApi';

const response = await useApi().getSearch({
  q: 'Jataizinho'
});
</script>