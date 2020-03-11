<template>
  <div class="home">
    <h1 v-if="getUser()">Olá {{ getUser() }}</h1>
    <!-- <login v-else></login> -->

    <h2>Proximos Eventos</h2>
    <div class="flex center">
      <div class="flex" v-if="sortedEvents">
        <div v-for="event in sortedEvents" :key="event.id">
          <event-card :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
// import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: {
    "event-card": EventCard
    // login: Login
  },
  methods: {
    getUser() {
      try {
        return this.$store.getters.active_user.name;
      } catch {
        console.log("NO_USER");
      }
    }
  },
  computed: {
    sortedEvents() {
      // GET EVENTS
      var array = this.$store.getters.events;
      // SORT EVENTS

      array = array.sort((a, b) => {
        var keyA = new Date(a.date),
          keyB = new Date(b.date);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      // console.log(array.slice(0, 3));
      return array.slice(0, 3);
    }
  }
};
</script>
<style lang="scss" scoped>
.stretch {
  align-items: stretch;
}
</style>