import { defineStore } from 'pinia'
import type { PartialLocation } from '~/types/api/api.interface';
import type { FavoriteStoreState } from '~/types/store/favorite.interface';

export default defineStore('favoriteStore', () => {
  // State
  const state: Ref<FavoriteStoreState> = ref({
    favoriteLocations: [],
  })

  // Getters
  const getAllFavorites = computed((): PartialLocation[] => {
    return state.value.favoriteLocations;
  });

  // Actions 
  const setFavoriteLocation = (location: PartialLocation) => {
    const favoriteLocationIndex = state.value.favoriteLocations.findIndex((favoriteLocation) => favoriteLocation.id === location.id );

    if (favoriteLocationIndex >= 0) {
      state.value.favoriteLocations.splice(favoriteLocationIndex, 1);
    } else {
      state.value.favoriteLocations.push(location);
    }
  }

  

  return {
    getAllFavorites,
    setFavoriteLocation,
  }
},
{
  persist: true,
});
