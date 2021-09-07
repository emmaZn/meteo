<template>
  <v-app>
    <v-app-bar app flat color="white">
      <div class="d-flex align-center">
        <v-app-bar-title>Meteo Sky</v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <search />
      <v-row justify="center" v-for="(city, index) in $store.state.cities" :key="index">
        <weather-card
          :city="city"
        ></weather-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard.vue";
// import axios from "axios";
export default {
  name: "App",

  components: {
    Search,
    WeatherCard,
  },

  data: () => ({
    datas: [],
  }),
};
</script>
