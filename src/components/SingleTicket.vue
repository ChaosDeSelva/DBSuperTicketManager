<template>
  <div class="c-ticket">
    <span
      class="c-ticket__title"
      :contenteditable="!isCompleted(ticket)"
      @keydown.enter.prevent="editTicket(ticket, $event.target.innerText)"
      @blur="editTicket(ticket, $event.target.innerText)">{{ ticket.title }}
      <span v-b-tooltip.hover title="Click anywhere in the title to edit the text!">
        <font-awesome-icon icon="edit" aria-label="Click to edit the ticket title."
        class="c-ticket__title__edit c-ticket__title__edit__icon pointer" @blur="bubbleUp()"/>
      </span>
    </span>
    <span v-if="!isCompleted(ticket)" class="close pointer" @click="removeTicket(ticket)">
      &times;
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
    bubbleUp() {
      // Do nothing, allow event to bubble up to the parent and use the parent blur.

    },

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

    .pointer {
      cursor: pointer;
    }

    .c-ticket__title {
      flex-grow: 1;

      .c-ticket__title__edit {
        display: none;
      }

      &:focus {
        box-shadow: 0 1px 0 0 #007bff;
        outline: none;
      } // &:focus

      // chain classes to give hide priority over hover when focused
      &:focus .c-ticket__title__edit.c-ticket__title__edit__icon {
          display: none;
      }

      &:hover .c-ticket__title__edit {
        display: inline-block;
      }
    } // .c-ticket__title
  } // .c-ticket
</style>
