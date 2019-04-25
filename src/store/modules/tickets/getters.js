export default {
  getStatuses:
    state => state.statuses,

  getStatusById:
    state => id => state.statuses.find(status => status.id === id),

  getTickets:
    state => state.tickets,

  getTicketById:
    state => id => state.tickets.find(ticket => ticket.id === id),

  getTicketsByStatusId:
    state => id => state.tickets.filter(ticket => ticket.status_id === id),
};
