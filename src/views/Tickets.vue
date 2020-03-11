<template>
  <div>
    <b-tabs content-class="mt-3">
      <h2>Info</h2>
      <b-tab v-for="place in places" :key="place.info.id" :title="place.info.name">
        <b-table striped hover :items="[place.info]"></b-table>

        <div class="flex right">
          <router-link tag="span" :to="{ name: 'create-event' }">
            <b-button variant="info" class="right">Novo Evento</b-button>
          </router-link>
        </div>
        <h2 class="center">Shows</h2>

        <!-- SHOWS -->
        <table class="table">
          <thead>
            <tr>
              <th v-for="field in shows_fields" :key="field">{{ field.toUpperCase() }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="show in getEvents(place.info.id)" :key="show.id">
              <td v-for="field in shows_fields" :key="field">
                <!-- link to item page -->
                <router-link
                  tag="a"
                  :to="{name: 'event',params: { id: show.id }}"
                  v-if="field == 'name'"
                >{{ show[field] }}</router-link>
                <span v-else>{{ show[field] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shows_fields: ["id", "name", "date", "tickets"]
    };
  },

  computed: {
    places() {
      return this.$store.getters.places;
    },
    events() {
      return this.$store.getters.events;
    }
  },
  methods: {
    getEvents(placeID) {
      return this.events.filter(el => {
        return el.place_id == placeID;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.far-right {
  // width: 100%;
  margin: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
