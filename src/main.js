import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { Plugin } from 'vue-responsive-video-background-player';
import Vue2Filters from 'vue2-filters';

Vue.use(Plugin);
Vue.use(Vue2Filters);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      const loggedInUser = JSON.parse(user);
      this.$store.commit('SET_USER', loggedInUser);
    }
  },
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
