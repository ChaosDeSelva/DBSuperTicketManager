<template>
  <div>
    <div class="c-ticket" draggable="true" @dragstart="dragStart($event)"
         @dragend="dragEnd()">
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

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TicketHelper from './mixins/TicketHelper';

export default {
  name: 'single-ticket',

  mixins: [TicketHelper],

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
    ...mapActions({
      editTicketAction: 'tickets/editTicket',
      removeTicketAction: 'tickets/removeTicket',
    }),
    /**
     * Drag a ticket to drop in a different group, create a custom drag dom object
     * @param  {[type]} event drag and drop event
     */
    dragStart(event) {
      // String the JSON of the ticket to send to the drop handler
      // TODO add touch events for mobile support
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

    /**
     * Remove custom DOM element on drag start when drag ends
     */
    dragEnd() {
      document.getElementById('ticketTargetDragElement').remove();
    },

    /**
     * Do not let icon mess up the edit trigger on the input
     */
    bubbleUp() {
      // Do nothing, allow event to bubble up to the parent and use the parent blur.
    },

    /**
     * Emit ticket error when edit a ticket. Emit to ticket cards component.
     * @param  {[type]} message error message
     */
    emitTicketEditStatus(message) {
      this.$emit('modal-error-message', message);
    },

    /**
     * Validate new ticket title, push edit changes
     * @param  {[type]} ticket Object the active ticket
     * @param  {[type]} title  String new ticket title
     */
    editTicket(ticket, title) {
      // Check if edit value change is too large or empty.
      // TODO does not edit on mobile, stackoverflow editing span on mobile
      const titleSize = this.validateTicketTitleCharacterSize(title);

      if (Object.prototype.hasOwnProperty.call(titleSize, 'error')) {
        this.emitTicketEditStatus(titleSize.error); // TODO force update ?
        return;
      }

      // Push ticket title change
      const updatedTicket = {
        ...ticket,
        title,
      };

      this.editTicketAction({ data: updatedTicket })
        .then(() => {
          window.getSelection().removeAllRanges();
        });
    }, // editTicket

    /**
     * Remove a ticket, confirm first
     * @param  {[type]} ticket Object the active ticket
     */
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
            this.removeTicketAction({ data: ticket });
          }
        })
        .catch(() => {
          // An error occurred TODO emit to error modal
        });
    }, // removeTicket

    /**
     * Check if ticket status is complete
     * @param  {[type]}  ticket Object the active ticket
     * @return {Boolean}        boolean check if status alias is complete
     */
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
