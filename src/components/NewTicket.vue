<template>
<div class="card mb-4 box-shadow">
  <div class="card-header">
    <h4 class="my-0 font-weight-normal" data-test="new-ticket-header">Create New Ticket</h4>
  </div>
  <div class="card-body">
    <form v-on:submit.prevent="addTicket(getTicketsByTitle(newTicketTitle),
                               getStatusByAlias('to-do'))">
      <div class="input-group">
        <input class="form-control form-control-lg" id="ticket-title" placeholder="Title"
                      type="text" v-on:keyup="errors = []" v-model="newTicketTitle">
        <div class="input-group-append">
          <span class="btn btn-primary btn-lg" id="add-ticket"
                @click="addTicket(getTicketsByTitle(newTicketTitle),
                        getStatusByAlias('to-do'))">Add</span>
        </div>
      </div>
      <div class="error-padding-top">
        <b-alert v-for="error in errors" :key="error" variant="danger" show>
          <div class="error">
            <font-awesome-icon icon="info-circle" /> {{ error }}
          </div>
        </b-alert>
      </div>
    </form>
  </div>

  <!-- Modal -->
  <b-modal id="ticket-success-modal" title="SUCCESS!!!">
    <font-awesome-icon icon="check-circle" /> You created a new ticket!
  </b-modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'new-ticket',

  data() {
    return {
      newTicketTitle: null,
      errors: [],
      todoStatusId: null,
    };
  }, // data

  computed: {
    ...mapGetters({
      getStatusByAlias: 'tickets/getStatusByAlias',
      getTicketsByTitle: 'tickets/getTicketsByTitle',
    }),
  }, // computed

  methods: {
    addTicket(ticketTitleExist, todoStatus) {
      // Validate Ticket Title
      this.findTicketTitleErrors(ticketTitleExist, todoStatus);

      // If we find errors dont dispatch the ticket
      if (this.errors.length > 0) {
        return;
      }

      // Dispatch a valid new ticket
      this.dispatchTicket();
    }, // addTicket

    findTicketTitleErrors(ticketTitleExist, todoStatus) {
      const activeErrors = [];

      const todoStatusObj = this.getTodoStatusId(todoStatus);
      activeErrors.push(todoStatusObj);
      activeErrors.push(this.validateTicketTitle(this.newTicketTitle));
      activeErrors.push(this.ticketTitleExist(ticketTitleExist));

      this.todoStatusId = Object.prototype.hasOwnProperty.call(todoStatusObj, 'id')
        ? this.todoStatusId = todoStatusObj.id : null;

      // find all objects with errors returned
      this.errors = activeErrors.map(item => item.error).filter(item => item);
    },

    validateTicketTitle(newTicketTitle) {
      // Check that the user has entered text in the ticket title input
      if (newTicketTitle === null || newTicketTitle.trim().length <= 0) {
        return { error: 'The ticket title field is required!' };
      }

      return {};
    },

    getTodoStatusId(todoStatus) {
      // Find the to-do status so we can get a status_id for the ticket
      if (typeof todoStatus === 'undefined' || !Object.prototype.hasOwnProperty.call(todoStatus, 'id')) {
        return { error: 'Error finding a valid state!' };
      }

      return { id: todoStatus.id };
    },

    ticketTitleExist(ticketTitleExist) {
      // Check if ticket title already exists
      if (ticketTitleExist.length > 0) {
        return { error: 'A ticket with this title already exists!' };
      }

      return {};
    },

    dispatchTicket() {
      // Dispatch the new ticket
      this.$store.dispatch('tickets/newTicket', {
        data: {
          title: this.newTicketTitle,
          status_id: this.todoStatusId,
        },
      }).then(() => {
        this.errors = [];
        this.newTicketTitle = null;
        this.$bvModal.show('ticket-success-modal');

        setTimeout(() => {
          this.$bvModal.hide('ticket-success-modal');
        }, 1500);
      });
    },
  }, // methods
};
</script>

<style lang="scss" scoped>
  .error {
    font-size: 12px;
  } // .error

  .error-padding-top {
    padding-top: 1rem;
  } // .error-padding-top
</style>
