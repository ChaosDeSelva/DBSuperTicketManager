export default {
  newTicket({ commit }, data) {
    commit('newTicket', data);
  },

  editTicket({ commit }, data) {
    commit('editTicket', data);
  },

  removeTicket({ commit }, data) {
    commit('removeTicket', data);
  },
};
