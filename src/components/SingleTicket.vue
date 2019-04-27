<template>
  <div class="c-ticket">
    <span
      class="c-ticket__title"
      :contenteditable="!isCompleted(ticket)"
      @keydown.enter.prevent="editTicket(ticket, $event.target.innerText)"
      @blur="editTicket(ticket, $event.target.innerText)"
    >{{ ticket.title }}</span>
    <span v-if="!isCompleted(ticket)" class="close" @click="removeTicket(ticket)">
      <span class="pointer">&times;</span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'single-ticket',

  props: {
    ticket: {
      required: true,
      type: Object,
    },
  }, // props

  computed: {
    ...mapGetters({
      getStatusById: 'tickets/getStatusById',
    }),
  }, // computed

  methods: {
    editTicket(ticket, title) {
      const updatedTicket = {
        ...ticket,
        title,
      };

      this.$store.dispatch('tickets/editTicket', { data: updatedTicket })
        .then(() => {
          window.getSelection().removeAllRanges();
        });
    }, // editTicket

    removeTicket(ticket) {
      this.$store.dispatch('tickets/removeTicket', { data: ticket });
    }, // removeTicket

    isCompleted(ticket) {
      return this.getStatusById(ticket.status_id).alias === 'completed' || false;
    }, // isCompleted
  }, // methods
};
</script>

<style lang="scss" scoped>
  .c-ticket {
    align-items: center;
    display: flex;
    justify-content: space-between;

    button {
      flex-shrink: 0;
      margin-left: 10px;
    } // button
  } // .c-ticket

  .c-ticket__title {
    flex-grow: 1;

    &:focus {
      box-shadow: 0 1px 0 0 #007bff;
      outline: none;
    } // &:focus
  } // .c-ticket__title

  .pointer {
    cursor: pointer;
  }
</style>
