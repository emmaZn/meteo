import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import sun from '@/components/icons/sun.vue'
import cloud from '@/components/icons/cloud.vue'
import mist from '@/components/icons/mist.vue'
import rain from '@/components/icons/rain.vue'
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
    },
  }
});
