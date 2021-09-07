<template>
  <v-card width="75%" dark class="ma-5">
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
        <v-row align="end">
          <v-col cols="2"
            ><v-icon size="80" class="ml-16">{{ icon }}</v-icon></v-col
          >
          <v-col cols="2"
            ><h1>{{ Math.round(temp) }} °C</h1></v-col
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
          class="px-16"
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
        <v-col v-for="(day, i) in days" :key="i">
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
    componentKey: 0,
    dialog: false,
    temp: 0,
    favorite: true,
    feels_like: 0,
    wind_speed: 0,
    humidity: 0,
    slider: 0,
    weather: {},
    ticksLabels: [],
    hours: [],
    days: [],
  }),
  mounted() {
    var moment = require("moment");
    const self = this;
    if (this.search) {
      this.show = true;
      this.favorite = false;
    }
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.city.lat}&lon=${this.city.lng}&exclude=minutely&appid=da5847ad1ce1cf01c604e53c5d560bf7&lang=fr&units=metric`;
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
            self.icon = "$vuetify.icons.mist";
            break;
          case "Rain":
            self.icon = "$vuetify.icons.rain";
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
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    color() {
      switch (this.weather.main) {
        case "Clear":
          return "to bottom right, #FFF500, #00FFE0";
        case "Clouds":
          return "to bottom right, #669AFF, #00FFE0";
        case "Mist":
          return "to bottom right, #D7729D, #00FFE0";
        case "Rain":
          return "to bottom right, #D7729D, #00FFE0";
        default:
          return "to bottom right, #669AFF, #00FFE0";
      }
    },
    get5days() {
      this.show = !this.show;
    },
    fav() {
      if (this.favorite) this.dialog = true;
      else
        this.$store.commit("addCity", {
          name: this.city.name,
          lat: this.city.lat,
          lng: this.city.lng,
        });
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
          this.icon = "$vuetify.icons.mist";
          break;
        case "Rain":
          this.icon = "$vuetify.icons.rain";
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
</style>