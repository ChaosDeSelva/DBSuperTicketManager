import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
});
