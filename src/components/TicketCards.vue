<template>
  <div class="card-deck mb-3">
    <div
      v-for="status in getStatuses"
      :key="status.id"
      class="card mb-4 box-shadow"
      :class="getCardClasses(status)"
      v-bind:id="status.id"
      v-on:drop="drop($event, status.id)" v-on:dragover="dragOver($event, status.id)"
      v-on:dragleave="dragLeave(status.id)"
      >
      <div
        class="card-header"
        :class="getCardHeaderClasses(status)">
        <div class="clearfix">
          <div class="float-left">
            {{ status.name }}
          </div>
          <div class="float-right" v-bind:aria-label="ticketGroupCountLabel(status.name, status.id)"
               v-b-tooltip.hover v-bind:title="ticketGroupCountLabel(status.name, status.id)">
            <font-awesome-icon icon="ticket-alt" aria-hidden="true"/>
            {{ticketGroupCount(status.id)}}
          </div>
        </div>
      </div>
      <ul
        v-if="ticketGroupCount(status.id)"
        class="list-group list-group-flush">
        <li
          v-for="ticket in getTicketsByStatusId(status.id)"
          :key="ticket.id"
          class="list-group-item c-ticket">
          <single-ticket :ticket="ticket" />
        </li>
      </ul>
      <div v-else class="card-body">
        <p class="card-text">No tickets.</p>
      </div>
    </div>

    <!-- Happy Modal -->
    <b-modal id="ticket-completed-modal" title="GREAT JOB!!!"  hide-footer>
      <div align="center">
        <h1>You completed a ticket!</h1>
        <img src="images/happy.gif" alt="completed outcome"/>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('ticket-completed-modal')">
        Close
      </b-button>
    </b-modal>

    <!-- Sad Modal -->
    <b-modal id="ticket-uncompleted-modal" title="UH OH!!!"  hide-footer>
      <div align="center">
        <h4>You moved a ticket out of completed status!</h4>
        <img src="images/sad.gif" alt="uncompleted outcome"/>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('ticket-uncompleted-modal')">
        Close
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SingleTicket from './SingleTicket.vue';

export default {
  name: 'ticket-cards',

  components: {
    'single-ticket': SingleTicket,
  }, // components

  computed: {
    ...mapGetters({
      getStatuses: 'tickets/getStatuses',
      getTicketsByStatusId: 'tickets/getTicketsByStatusId',
      getStatusById: 'tickets/getStatusById',
    }),

    ticketGroupCountLabel() {
      return (name, id) => {
        const count = this.ticketGroupCount(id);
        return `${count} ${count === 1 ? 'ticket' : 'tickets'} in ${name}.`;
      };
    },

    ticketGroupCount() {
      return id => this.getTicketsByStatusId(id).length;
    },
  }, // computed

  methods: {
    dragOver(event, id) {
      event.preventDefault();
      document.getElementById(id).classList.add('status-box-shadow');
    },

    dragLeave(id) {
      document.getElementById(id).classList.remove('status-box-shadow');
    },

    drop(event, groupStatusId) {
      event.preventDefault();

      // Clear drag hover class
      document.getElementById(groupStatusId).classList.remove('status-box-shadow');

      // Get the drop data, should be a string of JSON that is the ticket
      const ticket = event.dataTransfer.getData('ticket'); // maintains the old for later

      if (typeof ticket !== 'undefined') {
        const oldTicket = JSON.parse(ticket); // parse original ticket object
        const updatedTicket = JSON.parse(ticket);
        // Override the old status id with the new one
        updatedTicket.status_id = groupStatusId;

        this.dispatchStatusUpdate(oldTicket.status_id, updatedTicket);
      }
    },

    dispatchStatusUpdate(oldTicketStatusId, updatedTicket) {
      this.$store.dispatch('tickets/editTicket', { data: updatedTicket }).then(() => {
        window.getSelection().removeAllRanges();

        const wasTicketComplete = this.isTicketComplete(oldTicketStatusId);
        const isTicketComplete = this.isTicketComplete(updatedTicket.status_id);

        this.triggerTicketStatusChangeResponse(wasTicketComplete, isTicketComplete);
      });
    },

    triggerTicketStatusChangeResponse(wasTicketComplete, isTicketComplete) {
      if (!wasTicketComplete && isTicketComplete) {
        // happy modal, you completed a ticket
        this.$bvModal.show('ticket-completed-modal');
      } else if (wasTicketComplete && !isTicketComplete) {
        // sad modal, what happened? no longer complete!?
        this.$bvModal.show('ticket-uncompleted-modal');
      }
    },

    isTicketComplete(id) {
      return this.getStatusById(id).alias === 'completed' || false;
    },

    getCardClasses(status) {
      return {
        'border-danger': status.alias === 'to-do',
        'border-primary': status.alias === 'in-progress',
        'border-success': status.alias === 'completed',
      };
    }, // getCardClasses

    getCardHeaderClasses(status) {
      return {
        'text-white': true,
        'bg-danger': status.alias === 'to-do',
        'bg-primary': status.alias === 'in-progress',
        'bg-success': status.alias === 'completed',
      };
    }, // getCardHeaderClasses
  },
};
</script>

<style lang="scss" scoped>
  .status-box-shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
