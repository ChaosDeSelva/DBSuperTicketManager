<template>
  <main>
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Dashboard</h1>
        <blockquote class="blockquote">
          <p class="mb-0 lead">Power comes in response to a need, not a desire.
            You have to create that need.</p>
          <footer class="blockquote-footer"><cite title="Source Title">Kakarot</cite></footer>
        </blockquote>
      </div>
    </section>

    <div class="container">
      <new-ticket />
      <ticket-cards />
      <div class="row justify-content-center">
        <div class="col-8">

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TicketCards from '../components/TicketCards.vue';
import NewTicket from '../components/NewTicket.vue';

export default {
  name: 'view-dashboard',

  components: {
    'ticket-cards': TicketCards,
    'new-ticket': NewTicket,
  }, // components
};
</script>
