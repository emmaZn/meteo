<template>
  <div>
    <search />
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
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard.vue";
// import axios from "axios";
export default {
  name: "Home",

  components: {
    Search,
    WeatherCard,
  },
};
</script>

<style>
</style>