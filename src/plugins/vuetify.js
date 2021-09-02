import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import sun from '@/components/icons/sun.vue'
export default new Vuetify({
    icons: {
        values: {
          sun: { // name of our custom icon
            component: sun, // our custom component
          },
        },
    }
});
