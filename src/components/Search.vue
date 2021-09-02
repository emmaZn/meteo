<template>
  <div>
    <v-autocomplete
      type="text"
      v-model="selected"
      :items="searchResults"
      item-text="description"
      :search-input.sync="location"
      label="Rechercher une ville"
      @change="display"
      return-object
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    location: "Paris",
    searchResults: [],
    service: null,
    selected: null,
    geocoder: null,
    latLng: null,
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
      const self = this;
      this.geocoder.geocode(
        { placeId: self.selected.place_id },
        function (results, status) {
          if (status == "OK") {
            self.selected.lat = results[0].geometry.location.lat();
            self.selected.lng = results[0].geometry.location.lng();
            console.log(self.selected);
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
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