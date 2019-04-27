<template>
  <div class="card-deck mb-3">
    <div
      v-for="status in getStatuses"
      :key="status.id"
      class="card mb-4 box-shadow"
      :class="getCardClasses(status)">
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
