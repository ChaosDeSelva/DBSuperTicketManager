import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faStar, faTicketAlt, faInfoCircle, faCheckCircle, faRainbow, faEdit, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';

library.add(
  faCircle, faStar, faTicketAlt, faInfoCircle,
  faCheckCircle, faRainbow, faEdit, faArrowsAlt,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
