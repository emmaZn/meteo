<template>
  <v-app>
    <v-app-bar app flat :color="$vuetify.theme.dark ? '#25262f' : 'white'">
      <v-icon x-large>$vuetify.icons.water</v-icon>
      <span class="text-no-wrap ml-5 title"> METEO SKY</span>

      <div>
        <v-btn>A propos</v-btn>
        <v-btn>Rechercher</v-btn>
        <v-btn>Favoris</v-btn>

      </div>
      <v-spacer></v-spacer>

      <v-tooltip v-if="!$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            dark
            color="#2a9e96"
            small
            fab
            @click="darkMode"
            class="mr-5"
          >
            <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </template>
        <span>Mode sombre</span>
      </v-tooltip>

      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="white"
            small
            fab
            @click="darkMode"
            class="mr-5"
          >
            <v-icon color="#2a9e96">mdi-white-balance-sunny</v-icon>
          </v-btn>
        </template>
        <span>Mode clair</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
       <router-view></router-view>
    </v-main>
   
  </v-app>
</template>

<script>
// import axios from "axios";
export default {
  name: "App",

  mounted() {
    if (this.$store.state.dark) {
      console.log("dark");
      this.$vuetify.theme.dark = true;
    } else {
      console.log("light");
      this.$vuetify.theme.dark = false;
    }
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit("switchMode");
    },
  },
};
</script>
<style>
.theme--dark.v-application {
  background-color: var(--v-background-base, #25262f) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
.title {
  font-size: 50px;
  color: #2a9e96;
}
</style>