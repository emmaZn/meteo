<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <search />
      <!-- <HelloWorld/> -->
      <v-row justify="center" v-for="(city, index) in datas" :key="index">
        <weather-card
          :city="city"
          @close="city.show = !city.show"
        ></weather-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard.vue";
import axios from "axios";
export default {
  name: "App",

  components: {
    Search,
    WeatherCard,
  },

  data: () => ({
    datas: [],
  }),
  mounted() {
    var moment = require("moment");
    const self = this;
    this.$store.state.cities.forEach((city) => {
      let url = `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=da5847ad1ce1cf01c604e53c5d560bf7&lang=fr&units=metric`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          let timezoneInMinutes = response.data.dt / 60;
          response.data.show = false;
          response.data.time = moment()
            .utc(timezoneInMinutes)
            .locale("fr")
            .format("HH:mm");
          if (response.data.weather[0].main == "Clear")
            response.data.icon = "$vuetify.icons.sun";
          self.datas.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>
