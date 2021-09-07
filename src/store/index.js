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
        }]
    },
    mutations: {
        addCity(state, city) {
            state.cities.push(city)
        },
        delCity(state, cityName) {
            console.log(cityName)
            state.cities = state.cities.filter(function (el) {
                console.log(el.name, "-", cityName)
                return el.name != cityName;
            })
        },
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState()]
})