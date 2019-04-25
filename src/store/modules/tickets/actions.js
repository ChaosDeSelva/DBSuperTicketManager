export default {
  editTicket({ commit }, data) {
    commit('editTicket', data);
  },

  removeTicket({ commit }, data) {
    commit('removeTicket', data);
  },
};
