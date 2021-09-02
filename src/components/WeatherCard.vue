<template>
  <v-card
    width="75%"
    dark
    @click="$emit('close'); get5days"
  >
    <v-img
      :gradient="color()"
      src="https://via.placeholder.com/468x60"
      height="100%"
    >
      <v-container class="cont" width="95%">
        <v-card-title
          >{{ city.name }}
          <v-spacer />
          {{ city.time }}
        </v-card-title>
        <v-row align="end">
          <v-col cols="2"
            ><v-icon size="80" class="ml-16">{{ city.icon }}</v-icon></v-col
          >
          <v-col cols="2"
            ><h1>{{ Math.round(city.main.temp) }} °C</h1></v-col
          >
          <v-col>
            <p class="ma-0"> <b>Température ressentie : </b> {{Math.round(city.main.feels_like)}} °C</p>
            <p class="ma-0"> <b>Vent : </b> {{city.wind.speed}} km/h</p>
            <p class="ma-0"> <b>Humidité :</b> {{city.main.humidity}} %</p>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="city.show">
        <v-col v-for="(i) in 5" :key="i">
          <v-card>

          </v-card>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    city: {
      type: Object,
    },
  },
  methods: {
    color() {
      return "to bottom right, #669AFF, #00FFE0";
    },
    change() {
      this.show = !this.show;
    },
    get5days(){
      
    }
  },
};
</script>

<style>
.cont {
  max-width: 100% !important;
}
</style>