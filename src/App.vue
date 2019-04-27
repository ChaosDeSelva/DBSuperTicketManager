<template>
  <div id="app">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4
                bg-white border-bottom box-shadow">
      <span class="fa-stack fa-1x">
        <font-awesome-icon icon="circle" class="fa-stack-2x" />
        <font-awesome-icon icon="star" class="fa-stack-1x fa-inverse" />
      </span>
      <h5 class="my-0 mr-md-auto font-weight-normal">
         Dragonball Super
      </h5>
      <nav class="navbar my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="/"><font-awesome-icon icon="ticket-alt" /> Tickets</a>
        <a class="p-2 text-dark" href="/about"><font-awesome-icon icon="rainbow" /> About</a>
      </nav>
    </div>
    <router-view></router-view>
    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">© 2018 Company Name</p>
    </footer>
  </div><!-- /#app -->
</template>

<script>
export default {
  name: 'app',
};
</script>
