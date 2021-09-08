<template>
  <div>
    <v-row
      justify="center"
      v-for="city in $store.state.cities"
      :key="city.name"
    >
      <weather-card :city="city"></weather-card>
    </v-row>
  </div>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue'
export default {
  components: { WeatherCard },
}
</script>

<style>
</style>