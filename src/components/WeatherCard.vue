<template>
  <v-card
    :width="$vuetify.breakpoint.smAndDown ? '90%' : '75%'"
    dark
    class="ma-5"
    loader-height="2px"
    :loading="loading"
  >
    <v-img
      :gradient="color()"
      src="https://via.placeholder.com/468x60"
      height="100%"
    >
      <v-container class="cont mb-5" width="95%" @click="get5days">
        <v-card-title
          >{{ city.name.toUpperCase() }} - {{ weather.description }}
          <v-spacer />
          {{ time }}
          <v-btn icon @click="fav"
            ><v-icon>{{
              favorite ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon></v-btn
          >
        </v-card-title>
        <v-row>
          <v-col cols="6" sm="3" md="2"
            ><v-icon size="80" class="ml-16">{{ icon }}</v-icon></v-col
          >
          <v-col cols="6" sm="3" md="3"
            ><h1 class="temp">{{ Math.round(temp) }} °C</h1></v-col
          >
          <v-col>
            <p class="ma-0">
              <b>Température ressentie : </b>
              {{ Math.round(feels_like) }} °C
            </p>
            <p class="ma-0"><b>Vent : </b> {{ wind_speed }} km/h</p>
            <p class="ma-0"><b>Humidité :</b> {{ humidity }} %</p>
          </v-col>
        </v-row>
      </v-container>
      <v-row class="mb-10">
        <v-slider
          :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-16'"
          v-model="slider"
          step="1"
          min="0"
          max="7"
          :tick-labels="ticksLabels"
          ticks="always"
          tick-size="0"
          @change="slide"
        ></v-slider>
      </v-row>
      <v-row v-if="show" class="mb-10 mx-5">
        <v-col v-for="(day, i) in days" :key="i" cols="6" sm="4" md="2">
          <v-card height="200px" color="rgb(255, 0, 0, 0.2)">
            <v-row justify="center">
              <v-card-title> {{ day.name }} </v-card-title></v-row
            >
            <v-row justify="center" class="mb-5">
              <v-icon size="76" v-if="day.weather[0].main == 'Clear'"
                >$vuetify.icons.sun</v-icon
              >
              <v-icon size="76" v-if="day.weather[0].main == 'Rain'"
                >$vuetify.icons.rain</v-icon
              >
              <v-icon size="76" v-if="day.weather[0].main == 'Clouds'"
                >$vuetify.icons.cloud</v-icon
              >
            </v-row>
            <v-row justify="center">
              {{ Math.round(day.temp.min) }}° | {{ Math.round(day.temp.max) }}°
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-img>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Supprimer ? </v-card-title>
          <v-card-text
            >Êtes-vous sûr de vouloir supprimer {{ city.name }} de votre tableau
            de bord ?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false"> Annuler </v-btn>
            <v-btn color="primary" text @click="delfav"> Accepter </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "WeatherCard",
  props: {
    city: {
      type: Object,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: false,
    time: null,
    icon: "",
    dialog: false,
    temp: 0,
    favorite: true,
    feels_like: 0,
    wind_speed: 0,
    loading: false,
    humidity: 0,
    slider: 0,
    weather: {},
    ticksLabels: [],
    hours: [],
    newFavs: [],
    days: [],
  }),
  beforeDestroy() {},
  mounted() {
    this.loading=true
    var moment = require("moment");
    const self = this;
    if (this.search) {
      this.show = true;
    }
    if (
      this.$store.state.cities.find((element) => element.name == this.city.name)
    )
      this.favorite == true;
    else this.favorite = false;
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.city.lat}&lon=${this.city.lng}&exclude=minutely&appid=13816f364d3fb3d54c6fb76f657e0e31&lang=fr&units=metric`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.hours = response.data.hourly;
        this.days = response.data.daily.splice(0, 6);

        let timezoneInMinutes = response.data.timezone_offset / 60;
        self.time = moment()
          .utcOffset(timezoneInMinutes)
          .locale("fr")
          .format("HH:mm");
        var date = new Date(response.data.hourly[0].dt * 1000);
        this.days.forEach((day) => {
          console.log(day);
          var date1 = new Date(day.dt * 1000);
          day.name = moment(date1)
            .utcOffset(timezoneInMinutes)
            .locale("fr")
            .format("dddd");
        });
        this.ticksLabels[0] = parseInt(
          moment(date).utcOffset(timezoneInMinutes).locale("fr").format("HH")
        );
        for (let i = 1; i < 8; i++) {
          if (this.ticksLabels[i - 1] >= 21)
            this.ticksLabels[i] = this.ticksLabels[i - 1] + 3 - 24;
          else this.ticksLabels[i] = this.ticksLabels[i - 1] + 3;
        }
        for (let i = 0; i < 8; i++) {
          if (this.ticksLabels[i] < 10)
            this.ticksLabels[i] = "0" + this.ticksLabels[i].toString() + "h";
          else this.ticksLabels[i] = this.ticksLabels[i].toString() + "h";
        }
        switch (response.data.current.weather[0].main) {
          case "Clear":
            self.icon = "$vuetify.icons.sun";
            break;
          case "Clouds":
            self.icon = "$vuetify.icons.cloud";
            break;
          case "Mist":
            self.icon = "$vuetify.icons.haze";
            break;
          case "Rain":
            self.icon = "$vuetify.icons.rain";
            break;
          case "Haze":
            self.icon = "$vuetify.icons.haze";
            break;
          case "Fog":
            self.icon = "$vuetify.icons.haze";
            break;
          case "Thunderstorm":
            self.icon = "$vuetify.icons.thunder";
            break;
          default:
            self.icon = "$vuetify.icons.sun";
            break;
        }
        self.weather = response.data.current.weather[0];
        self.temp = response.data.current.temp;
        self.humidity = response.data.current.humidity;
        self.feels_like = response.data.current.feels_like;
        self.wind_speed = response.data.current.wind_speed;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    color() {
      switch (this.weather.main) {
        case "Clear":
          return "114.15deg, #E8677E, #EAA640";
        case "Clouds":
          return "114.15deg, #3CDDD3, #2C59B0";
        case "Mist":
          return "114.15deg, #E8677E, #2C59B0";
        case "Rain":
          return "114.15deg, #E8677E, #2C59B0";
        case "Haze":
          return "114.15deg, #E8677E, #2C59B0";
        case "Fog":
          return "114.15deg, #E8677E, #2C59B0";
        case "Thunderstorm":
          return "114.15deg, #E8677E, #2C59B0";
        case "Snow":
          return "114.15deg, #3DC8B7, #E6F8B3";
        default:
          return "114.15deg, #669AFF, #E8677E";
      }
    },
    get5days() {
      this.show = !this.show;
    },
    fav() {
      if (this.favorite) this.dialog = true;
      else {
        this.$store.commit("addCity", {
          name: this.city.name,
          lat: this.city.lat,
          lng: this.city.lng,
        });
        this.favorite = true;
      }
      this.$emit("fav");
    },
    delfav() {
      this.favorite = false;
      this.$store.commit("delCity", this.city.name);
      console.log(this.city.name);
      this.dialog = false;
    },
    slide(e) {
      console.log(e);
      let i = e * 3;
      switch (this.hours[i].weather[0].main) {
        case "Clear":
          this.icon = "$vuetify.icons.sun";
          break;
        case "Clouds":
          this.icon = "$vuetify.icons.cloud";
          break;
        case "Mist":
          this.icon = "$vuetify.icons.haze";
          break;
        case "Rain":
          this.icon = "$vuetify.icons.rain";
          break;
        case "Haze":
          this.icon = "$vuetify.icons.haze";
          break;
        case "Thunderstorm":
          this.icon = "$vuetify.icons.thunder";
          break;

        default:
          this.icon = "$vuetify.icons.sun";
          break;
      }
      this.weather = this.hours[i].weather[0];
      this.temp = this.hours[i].temp;
      this.humidity = this.hours[i].humidity;
      this.feels_like = this.hours[i].feels_like;
      this.wind_speed = this.hours[i].wind_speed;
    },
  },
};
</script>

<style>
.cont {
  max-width: 100% !important;
}
.temp {
  font-size: 3em;
}
</style>