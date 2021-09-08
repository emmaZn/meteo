<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-autocomplete
          prepend-inner-icon="mdi-magnify"
          color="black"
          width="75%"
          type="text"
          v-model="selected"
          :items="searchResults"
          hide-no-data
          item-text="description"
          :search-input.sync="location"
          label="Rechercher une ville"
          @change="display"
          return-object
      /></v-col>
    </v-row>
    <v-row justify="center">
      <weather-card
        v-if="find"
        :search="true"
        :city="city"
        :key="city.name"
        @fav="find = !find"
      ></weather-card>
    </v-row>
  </div>
</template>
<script>
import WeatherCard from "./WeatherCard.vue";
export default {
  components: { WeatherCard },
  data: () => ({
    location: "Paris",
    searchResults: [],
    service: null,
    selected: null,
    geocoder: null,
    latLng: null,
    find: false,
    city: {},
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_OC5u-UiIes3OwuCzN9tWAcO0Orm5DBk&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit(),
        },
      ],
    };
  },
  watch: {
    location(newValue) {
      if (newValue) {
        this.service.getPlacePredictions(
          {
            input: this.location,
            types: ["(cities)"],
          },
          this.displaySuggestions
        );
      }
    },
  },
  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService();
      this.geocoder = new window.google.maps.Geocoder();
    },
    display() {
      this.find = false;
      const self = this;
      this.city.show = true;
      this.geocoder.geocode(
        { placeId: self.selected.place_id },
        function (results, status) {
          if (status == "OK") {
            self.city.lat = results[0].geometry.location.lat();
            self.city.lng = results[0].geometry.location.lng();
            console.log(self.city);

            self.find = true;
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
      this.city.name = this.selected.structured_formatting.main_text;
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions;
    },
  },
};
</script>