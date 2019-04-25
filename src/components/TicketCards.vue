<template>
  <div class="card-deck mb-3">
    <div
      v-for="status in getStatuses"
      :key="status.id"
      class="card mb-4 box-shadow"
      :class="getCardClasses(status)"
    >
      <div
        class="card-header"
        :class="getCardHeaderClasses(status)"
      >{{ status.name }}</div>
      <ul
        v-if="getTicketsByStatusId(status.id).length"
        class="list-group list-group-flush"
      >
        <li
          v-for="ticket in getTicketsByStatusId(status.id)"
          :key="ticket.id"
          class="list-group-item c-ticket"
        >
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
