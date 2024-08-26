import { defineStore } from 'pinia'
import type { FavoriteStoreState } from '~/types/store/favorite.interface';

export default defineStore('favoriteStore', () => {
  // State
  const state: Ref<FavoriteStoreState> = ref({
    testValue: 'Test 1'
  })

  // Getters
  const getState = computed((): FavoriteStoreState => {
    return state.value;
  });

  return {
    getState,
  }
})