import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import router from './router'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
