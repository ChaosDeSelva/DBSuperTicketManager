<template>
  <div class="card mb-4 box-shadow">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">Create New Ticket</h4>
    </div>
    <div class="card-body">
      <form>
        <div class="input-group">
          <input
            class="form-control form-control-lg"
            id="ticket-title"
            placeholder="Title"
            type="text"
            @keyup.enter="addTicket"
            v-model="newTicketTitle"
          >
          <div class="input-group-append">
            <span class="btn btn-primary btn-lg" @click="addTicket">Add</span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new-ticket',

  data() {
    return {
      newTicketTitle: null,
    };
  }, // data

  methods: {
    addTicket() {
      // [...]
    }, // addTicket
  }, // methods
};
</script>
