import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: [{
            name: "Paris",
            lat: 48.856614,
            lng: 2.3522219
        }],
        dark:false
    },
    mutations: {
        addCity(state, city) {
            if (!state.cities.find((element) => element.name == city.name)) state.cities.unshift(city)
        },
        delCity(state, cityName) {
            console.log(cityName)
            state.cities = state.cities.filter(function (el) {
                console.log(el.name, "-", cityName)
                return el.name != cityName;
            })
        },
        switchMode(state){
            state.dark = !state.dark
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState()]
})