export default {
  methods: {
    /**
     * Check title is defined or greater than 256 characters
     * @param  {[type]} newTicketTitle String new ticket title
     * @return {[type]}                Object error message if error else empty object
     */
    validateTicketTitleCharacterSize(newTicketTitle) {
      // Check that the user has entered text in the ticket title input
      if (typeof newTicketTitle === 'undefined' || newTicketTitle === null ||
          newTicketTitle.trim().length <= 0) {
        return { error: 'The ticket title field is required!' };
      }

      // if the new title is greater than 256 then throw and error
      if (newTicketTitle.trim().length > 256) {
        return { error: 'The ticket title can not be more than 256 characters!' };
      }

      return {};
    },

    /**
     * Find valid status id for to-do else where does the ticket go, error in status store
     * @param  {[type]} todoStatus String status to find store
     * @return {[type]}            Object error message if error else empty object
     */
    getTodoStatusId(todoStatus) {
      // Find the to-do status so we can get a status_id for the ticket
      if (typeof todoStatus === 'undefined' || !Object.prototype.hasOwnProperty.call(todoStatus, 'id')) {
        return { error: 'Error finding a valid state!' };
      }

      return { id: todoStatus.id };
    },

    /**
     * Check if ticket is already in the store
     * @param  {[type]} ticketTitleExist String ticket title
     * @return {[type]}                  Object error message if error else empty object
     */
    validateTicketTitleExistInStore(ticketTitleExist) {
      // Check if ticket title already exists
      if (ticketTitleExist.length > 0) {
        return { error: 'A ticket with this title already exists!' };
      }

      return {};
    },
  },
};
