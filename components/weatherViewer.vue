<template>
  <div v-if="weatherInformations" class="weather-viewer-container">
    <div class="weather-viewer-main-info-container">
      <div class="weather-viewer-main-info-title">
        <button
          :class="['weather-viewer-favorite-button', isFavoriteLocation ? 'unfavorite' : 'favorite']"
          @click="favoriteLocation"
        >
          <template v-if="isFavoriteLocation">
            <IconsFavorite class="weather-viewer-favorite-icon" />
            <p>Unfavorite</p>
          </template>
          <template v-else>
            <IconsUnfavorite class="weather-viewer-favorite-icon" />
            <p>Favotire</p>
          </template>
        </button>
  
        <div class="weather-viewer-main-title">
          <h1>
            {{ weatherInformations.location.name }}, {{ weatherInformations.location.country }}
          </h1>
          <h2>
            {{ formatDateToEnglish(new Date()) }}
          </h2>
        </div>
      </div>

      <div class="weather-viewer-info">
        <div class="weather-viewer-temperature">
          <img :src="weatherInformations.current.condition.icon" loading="lazy">
          <div class="weather-viewer-temperature-container">
            <h3 class="weather-viewer-temperature-degrees">
              {{ weatherInformations.current.temp_c }}°
            </h3>
            <h4 class="weather-viewer-temperature-text">
              {{ weatherInformations.current.condition.text }}
            </h4>
          </div>
        </div>

        <div class="weather-viewer-detailed-info">
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${todayDetailedInfo.day.maxtemp_c}°`"
            sub="High"
          />
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${todayDetailedInfo.day.mintemp_c}°`"
            sub="Low"
          />
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${weatherInformations.current.wind_mph}mph`"
            sub="Wind"
          />
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${weatherInformations.current.pressure_in}in`"
            sub="Pressure"
          />
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${weatherInformations.current.humidity}%`"
            sub="Humidity"
          />
          <MainSubtext
            class="weather-viewer-detailed-content-container"
            :main="`${weatherInformations.current.precip_mm}mm`"
            sub="Precipitation"
          />
        </div>
      </div>
    </div>

    <div class="weather-viewer-today-weather-container">
      <h3 class="weather-viewer-today-weather-title">
        Today's Weather
      </h3>
      <div class="weather-viewer-today-weather-list">
        <HourInformationCard
          v-for="hour in hoursInformations"
          :hour="hour"
        />
      </div>
    </div>

    <div v-if="next3DaysInfo" class="weather-viewer-next-days">
      <h3 class="weather-viewer-next-days-title">
        Next 3 Days
      </h3>
      <NextDayCard
        v-for="day in next3DaysInfo"
        class="weather-viewer-next-days-item"
        :forecast-day="day"
      />
    </div>
  </div>

  <div v-else>Loading</div>
</template>

<script lang="ts" setup>
import { useFavoriteStore } from '~/store';
import type { CurrentLocation, ForecastDay, Hour, PartialLocation } from '~/types/api/api.interface';

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
    lazy: true,
  },
);

const todayDetailedInfo = computed(() => {
  return weatherInformations.value?.forecast?.forecastday[0];
});

const next3DaysInfo = computed(() => {
  const forecastDays: ForecastDay[] = JSON.parse(JSON.stringify(weatherInformations.value?.forecast?.forecastday));
  if (forecastDays.length) {
    forecastDays.splice(0, 1);

    return forecastDays;
  }
  return false;
});

const hoursInformations = computed(() => {
  const hours = todayDetailedInfo.value.hour;
  const validHours: Hour[] = [];

  for (let index = 0; index < hours.length; index += 3) {
    validHours.push(hours[index]);
  }

  return validHours;
});

const isFavoriteLocation = computed((): boolean => {
  if (favoriteStore.getAllFavorites.length && currentLocationId.value) {
    return !!favoriteStore.getAllFavorites.find((location: PartialLocation) => location.id === currentLocationId.value);
  }

  return false;
});


const favoriteLocation = (): void => {
  favoriteStore.setFavoriteLocation({...weatherInformations.value.location, id: currentLocationId.value});
};
</script>

<style scoped lang="scss">
.weather-viewer-container {
  color: $text-color-white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 10px;
  
  .weather-viewer-main-info-container {
    max-width: 570px;
    width: 100%;
    position: relative;
    background-color: $background-primary-color;
    padding: 10px;
    border-radius: $border-radius;
    
    .weather-viewer-main-info-title {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      text-align: center;
      justify-content: center;
    
      .weather-viewer-favorite-button {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        right: 0;
        top: 0;
        padding: $button-padding;
        border-radius: $border-radius;
        width: min-content;
        font-weight: 600;
        align-self: center;
        color: $color-pink;
  
        &.favorite,
        &.unfavorite {
          background-color: #ffffffd9;
          color: $color-pink;
        }
  
        .weather-viewer-favorite-icon {
          width: 18px;
          height: 18px;
        }
      }
    }

    .weather-viewer-info {
      display: grid;
      justify-items: center;
      margin-top: 1rem;
      
      .weather-viewer-temperature {
        display: flex;
        flex-wrap: nowrap;
        gap: 2rem;
        justify-content: center;
        border-bottom: 2px solid $color-dark-gray;

        img {
          width: 80px;
          height: 80px;
        }

        .weather-viewer-temperature-container {
          text-align: center;
          margin-bottom: 0.5rem;
          .weather-viewer-temperature-degrees {
            font-size: 4rem;
          }
          .weather-viewer-temperature-text {
            font-size: 1rem;
          }
        }
      }

      .weather-viewer-detailed-info {
        margin-top: 1rem;
        display: grid;
        gap: 0.75rem;
        grid-template-columns: repeat(3, 1fr);

        .weather-viewer-detailed-content-container {
          width: 33%;
          text-align: center;
          align-content: center;
        
          .weather-viewer-detailed-content {
            font-weight: 600;
          }
          .weather-viewer-detailed-text {
            margin-top: 0.15rem;
          }
        }
      }
    }
  }

  .weather-viewer-today-weather-container {
    margin-top: 1rem;
    width: 100%;
    max-width: 590px;
    .weather-viewer-today-weather-title {
      margin-bottom: 0.25rem;
    }
    .weather-viewer-today-weather-list {
      display: flex;
      gap: 1rem;
      overflow-y: auto;
    }
  }

  .weather-viewer-next-days {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.75rem;
    width: 100%;
    max-width: 590px;
    gap: 0.75rem;
    margin-bottom: 20px;

    .weather-viewer-next-days-item {
      width: 100%;
    }
  }
}

@media only screen and (min-width: 768px) {
  .weather-viewer-container {
    .weather-viewer-main-info-container {
      .weather-viewer-main-info-title {
        flex-direction: column;
        justify-content: unset;
        text-align: start;

        .weather-viewer-favorite-button {
          margin-top: 0rem;
          position: absolute;
        }
      }

      .weather-viewer-info {
        display: flex;
        margin-top: 1.5rem;
        
        .weather-viewer-temperature {
          width: auto;
          border-right: 2px solid $color-dark-gray;
          border-bottom: unset;

          .weather-viewer-temperature-container {
            margin-right: 1rem;
          }
        }

        .weather-viewer-detailed-info {
          margin-top: 0rem;
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>