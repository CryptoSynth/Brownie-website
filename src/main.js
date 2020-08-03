import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { Plugin } from 'vue-responsive-video-background-player';
import Vue2Filters from 'vue2-filters';
import VueTheMask from 'vue-the-mask';

Vue.use(Plugin);
Vue.use(Vue2Filters);
Vue.use(VueTheMask);

Vue.config.productionTip = false;

new Vue({
  router,
  store,

  //automatic login
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.commit('user/SET_USER', user);
    }
  },
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
