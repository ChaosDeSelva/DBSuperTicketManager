import uuid from 'uuid/v4';

/* eslint-disable no-param-reassign */
export default {
  newTicket(state, { data }) {
    state.tickets.push({
      ...data,
      id: uuid(),
    });
  },

  editTicket(state, { data }) {
    Object.entries(data).forEach(([key, value]) => {
      state.tickets.find(ticket => ticket.id === data.id)[key] = value;
    });
  },

  removeTicket(state, { data }) {
    state.tickets.splice(state.tickets.indexOf(data), 1);
  },
};
/* eslint-enable no-param-reassign */
