<template>
  <div class="c-ticket" draggable="true" v-on:dragstart="dragStart($event)"
       v-on:dragend="dragEnd()">
    <span style="padding-right: 5px;">
      <font-awesome-icon icon="arrows-alt" class="pointer" />
    </span>
    <span
      class="c-ticket__title"
      :contenteditable="!isCompleted(ticket)"
      @keydown.enter.prevent="editTicket(ticket, $event.target.innerText)"
      @blur="editTicket(ticket, $event.target.innerText)"> {{ ticket.title }}
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
    dragStart(event) {
      // String the JSON of the ticket to send to the drop handler
      event.dataTransfer.setData('ticket', JSON.stringify(this.ticket));

      // Custom Drag item
      const dragDisplayElement = document.createElement('div');
      dragDisplayElement.style.width = '300px';
      dragDisplayElement.style.background = 'darkred';
      dragDisplayElement.style.color = 'white';
      dragDisplayElement.style.padding = '5px';
      dragDisplayElement.style.border = '2px black solid';
      dragDisplayElement.style.right = '100000px';
      dragDisplayElement.style.position = 'absolute';
      dragDisplayElement.innerHTML = this.ticket.title;
      dragDisplayElement.id = 'ticketTargetDragElement';
      document.body.appendChild(dragDisplayElement);

      event.dataTransfer.setDragImage(dragDisplayElement, -10, -10);
    },

    dragEnd() {
      document.getElementById('ticketTargetDragElement').remove();
    },

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
      this.$bvModal.msgBoxConfirm('Delete this ticket?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((value) => {
          if (value) {
            this.$store.dispatch('tickets/removeTicket', { data: ticket });
          }
        })
        .catch(() => {
        // An error occurred TODO
        });
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
