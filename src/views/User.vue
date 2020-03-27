<template>
  <div>
    <!-- {{ user }} -->
    <b-jumbotron :header="activeUser.name" :lead="activeUser.email">
      <div class="eventos">
        <h4>Meus eventos</h4>
        <b-list-group v-if="userEvents.length" id="event-list">
          <b-list-group-item
            v-for="event in userEvents"
            :key="event.id"
            :to="{
                            name: 'event',
                            params: { id: event.id }
                        }"
          >
            {{ event.name }}
            <!-- <b-badge variant="primary" pill>{{ event }}</b-badge> -->
          </b-list-group-item>
        </b-list-group>
        <h3 v-else class="text-secondary">Nenhum evento encontrado</h3>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["events", "activeUser"]),

    userEvents() {
      var eventIDs = this.activeUser.tickets.map(el => el.id);

      return this.events.filter(el => {
        return eventIDs.includes(el.id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#event-list {
  max-width: 20rem;
  margin: auto;
}
</style>
