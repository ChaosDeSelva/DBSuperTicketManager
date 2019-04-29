<template>
<div class="card mb-4 box-shadow">
  <div class="card-header">
    <h4 class="my-0 font-weight-normal" data-test="new-ticket-header">Create New Ticket</h4>
  </div>
  <div class="card-body">
    <form v-on:submit.prevent="addTicket(getTicketsByTitle(newTicketTitle),
                               getStatusByAlias('to-do'))" autocomplete="off">
      <div class="input-group">
        <input class="form-control form-control-lg" id="ticket-title" placeholder="Ticket Title"
                      type="text" @keydown="errors = []" v-model="newTicketTitle"
                      aria-label="Insert a ticket title." autocomplete="off">
        <div class="input-group-append">
          <span class="btn btn-primary btn-lg" id="add-ticket"
                aria-label="Create a new ticket."
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
  <b-modal id="ticket-success-modal" title="SUCCESS!!!" hide-footer>
    <font-awesome-icon icon="check-circle" /> You created a new ticket!
  </b-modal>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TicketHelper from './mixins/TicketHelper';

export default {
  name: 'new-ticket',

  mixins: [TicketHelper],

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
    ...mapActions({
      newTicket: 'tickets/newTicket',
    }),
    /**
     * Check title meets the requirements and add as a new ticket todo
     * @param {[type]} ticketTitleExist string check if title exist
     * @param {[type]} todoStatus       UUID status id of to-do
     */
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

    /**
     * Find errors in new title text
     * @param  {[type]} ticketTitleExist string check if title exist
     * @param  {[type]} todoStatus       UUID status id of to-do
     */
    findTicketTitleErrors(ticketTitleExist, todoStatus) {
      const activeErrors = [];

      const todoStatusObj = this.getTodoStatusId(todoStatus);
      activeErrors.push(todoStatusObj);
      activeErrors.push(this.validateTicketTitleCharacterSize(this.newTicketTitle));
      activeErrors.push(this.validateTicketTitleExistInStore(ticketTitleExist));

      this.todoStatusId = Object.prototype.hasOwnProperty.call(todoStatusObj, 'id')
        ? this.todoStatusId = todoStatusObj.id : null;

      // find all objects with errors returned
      this.errors = activeErrors.map(item => item.error).filter(item => item);
    },

    /**
     * Dispatch ticket for mutation
     */
    dispatchTicket() {
      // Dispatch the new ticket
      this.newTicket({
        data: {
          title: this.newTicketTitle,
          status_id: this.todoStatusId,
        },
      })
        .then(() => {
          this.errors = [];
          this.newTicketTitle = null;
          this.$bvModal.show('ticket-success-modal');

          setTimeout(() => {
            this.$bvModal.hide('ticket-success-modal');
          }, 1000);
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
