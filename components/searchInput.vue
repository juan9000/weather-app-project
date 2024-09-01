<template>
  <div class="search-bar-container">
    <div class="search-bar-input-container">
      <input
        v-model="inputText"
        type="text"
        placeholder="Search by location"
        @input="inputTextInterval()"
        @keypress.enter="navigateToLocation"
      />
      <div class="search-bar-icons-container" >
        <IconsSearch class="search-bar-search-icon" @click="navigateToLocation" />
        <IconsCurrentLocation class="search-bar-location-icon" @click="getGeolocation" />
      </div>
    </div>
    <div v-if="showLocationList" class="search-bar-list-container">
      <div v-if="loading.list" class="search-bar-list-loading">
        loading
      </div>
      <div v-else-if="locations.length"  class="search-bar-list">
        <div
          v-for="(location, index) in locations"
          :key="index"
          class="search-bar-list-item"
          @click="setLocation(location)"
        >
          {{ location.fullName }}
        </div>
      </div>
      <div v-else>
        No locations found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { PartialLocation } from '~/types/api/api.interface';

const locations: Ref<PartialLocation[]> = ref([]);
const interval: Ref<ReturnType<typeof setTimeout> | number | null> = ref(null);
const inputText: Ref<string> = ref('');
const selectedLocationId: Ref<number | null> = ref(null);
const showLocationList: Ref<boolean> = ref(false);
const loading = reactive({
  list: false,
  geolocation: false,
});

const searchLocations = async (value: string, geolocationRequest: boolean = false): Promise<void> => {
  try {
    const response = await useApi().getSearchList({ q: value });
    locations.value = response.map((location) => {
      location.fullName = `${location.name}, ${location.region}, ${location.region}`;
      return location;
    });

    if (geolocationRequest && locations.value.length === 1) {
      setLocation(locations.value[0], false);
    } else {
      showLocationList.value = true;
    }
  } catch (error) {
    locations.value = [];
    console.error('Error while fetching locations:', error);
  }
}

const setLocation = (location: PartialLocation, navigation: boolean = true) => {
  inputText.value = location.fullName;
  selectedLocationId.value = location.id;
  
  if (navigation) {
    navigateToLocation();
  }
}

const navigateToLocation = (): void => {
  if (selectedLocationId.value) {
    navigateTo(`/${selectedLocationId.value}`);
  } else if (inputText.value.length >= 3) {
    navigateTo(`/${inputText.value.replaceAll(', ', '_').replaceAll(' ', '-')}`);
  }
}

const inputTextInterval = (): void => {
  const intervalTime: number = 750 // 0.75 seconds in miliseconds 
  selectedLocationId.value = null;

  clearInterval(interval.value as number);

  interval.value = setInterval(async () => {
    if (inputText.value?.length >= 3) {
      loading.list = true;
      await searchLocations(inputText.value);
      loading.list = false;
    } else {
      locations.value = [];
    }
    clearInterval(interval.value as number);
  }, intervalTime);
};

const handleLocation = async (location: GeolocationPosition) => {
  loading.geolocation = true;
  showLocationList.value = false;
  await searchLocations(`${location.coords.latitude},${location.coords.longitude}`, true);
  loading.geolocation = false;
}

const showError = (error: GeolocationPositionError) => {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.error('toast:', 'User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.error('toast:', 'Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.error('toast:', 'The request to get user location timed out.');
      break;
  }
}

const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleLocation, showError);
  }
}
</script>

<style scoped lang="scss">
.search-bar-container {
  .search-bar-input-container {
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: $color-white;
    border: 1px solid $color-black;
    padding: 6px;
    position: relative;
    z-index: 99;
  
    input {
      font-size: 1rem;
      width: -webkit-fill-available;
      width: 100%;
    }
  
    .search-bar-icons-container {
      padding-left: 6px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .search-bar-search-icon,
      .search-bar-location-icon {
        border-left: 1px solid $color-black;
        margin-left: 6px;
        padding-left: 6px;
        width: 1.5rem;
        height: 1.5rem;
        &:hover {
          color: $color-mid-blue;
        }
      }
    }
  }

  .search-bar-list-container {
    border-radius: 6px;
    background-color: $color-white;
    border: 1px solid $color-black;
    padding: 16px 0px 6px 0px;
    margin-top: -10px;
    position: relative;
    z-index: 0;
    color: $color-black;

    .search-bar-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .search-bar-list-item {
        padding: 2px 6px;
        cursor: pointer;
        &:hover {
          background-color: $color-light-blue;
        }
      }
    }
  }
}

@media only screen and (min-width: 360px) {
  .search-bar-container {
    .search-bar-input-container {
      padding: 8px;
    
      input {
        font-size: 1.5rem;
      }
    }
  }

  .search-bar-list-container {
    padding: 18px 8px 8px 8px;
    margin-top: -12px;

    .search-bar-list {
      .search-bar-list-item {
        font-size: 1.1rem;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .search-bar-container {
    .search-bar-input-container {
      padding: 10px;
    
      input {
        font-size: 1.75rem;
      }

      .search-bar-icons-container {
        .search-bar-search-icon,
        .search-bar-location-icon {
          margin-left: 8px;
          padding-left: 8px;
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }

  .search-bar-list-container {
    padding: 20px 10px 10px 10px;
    margin-top: -14px;
  }
}
</style>
