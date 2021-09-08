import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import sun from '@/components/icons/sun.vue'
import cloud from '@/components/icons/cloud.vue'
import mist from '@/components/icons/mist.vue'
import rain from '@/components/icons/rain.vue'
import haze from '@/components/icons/haze.vue'
import water from '@/components/icons/water.vue'
import thunder from '@/components/icons/thunder.vue'
export default new Vuetify({
  icons: {
    values: {
      sun: {
        component: sun,
      },
      cloud: {
        component: cloud,
      },
      mist: {
        component: mist,
      },
      rain: {
        component: rain,
      },
      haze: {
        component: haze,
      },
      thunder: {
        component: thunder,
      },
      water: {
        component: water,
      },
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#2a9e96"
      },
      dark: {
        primary: "#2a9e96"
        ,
        background: '#25262F'
      }
    },

  }
});
