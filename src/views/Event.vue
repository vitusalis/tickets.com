<template>
  <div class="flex center vertical" v-if="event">
    <event-card :event="event">
      <div class="flex horizontal">
        <b-button @click="pushEdit" variant="warning">Editar</b-button>
        <b-button variant="danger">Excluir</b-button>
      </div>
    </event-card>

    <router-view :eventTemplate="event"></router-view>
  </div>
</template>

<script>
// import EventCard from "../components/EventCard.vue";
import EventCard from "../components/EventCard.vue";
export default {
  data() {
    return {};
  },
  components: { "event-card": EventCard },
  methods: {
    pushEdit() {
      this.$router.push({ name: "update-event" });
    }
  },
  computed: {
    event() {
      return this.$store.getters.events.find(el => {
        return el.id == this.$route.params.id;

        // is it better to have a computed property or a lifecycle hook to fetch the object?
      });
    }
  }
};
</script>

<style></style>
