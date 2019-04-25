import Vue from 'vue';
import Vuex from 'vuex';
import tickets from './modules/tickets';

Vue.use(Vuex);

/**
 * @name store
 * @description Vuex store
 * -----------------------------------------------------------------------------
 */

const store = {
  modules: {
    tickets,
  },
};

export default new Vuex.Store(store);
