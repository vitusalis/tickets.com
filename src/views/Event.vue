<template>
  <div class="flex center vertical">
    <event-card :event="eventById(this.$route.params.id)" v-if="!editing" :fullInfo="true">
      <div class="flex horizontal" v-if="isActiveUser">
        <b-button pill @click="edit" variant="warning">Editar</b-button>
        <b-button pill @click="remove" variant="danger">Excluir</b-button>
      </div>
    </event-card>

    <router-view :eventTemplate="eventById(this.$route.params.id)"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventCard from "../components/EventCard.vue";
export default {
  data() {
    return {
      editing: false
    };
  },
  components: { "event-card": EventCard },
  methods: {
    edit() {
      this.editing = true;
      this.$router.push({ name: "update-event" });
    },
    remove() {
      this.$store.dispatch("removeItem", ["events", this.event]);
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["eventById", "isActiveUser"])
    // event() {
    //     return this.$store.getters.events.find(el => {
    //         return el.id == this.$route.params.id;
    //         // is it better to have a computed property or a lifecycle hook to fetch the object?
    //     });
    // },
    // isAuthenticated() {
    //   return this.$store.getters.active_user;
    // }
  }
};
</script>

<style></style>
