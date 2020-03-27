<template>
  <div>
    <div class="page-title">
      <!-- SHOULD NOT USE V-IF -->
      <h1 v-if="event.name">Editando evento #{{ event.id }}</h1>
      <h1 v-else>Novo Evento</h1>
    </div>
    <div class="form">
      <b-form @submit="onSubmit" id="mainForm">
        <b-form-group label="Casa do Evento" label-for="event-place">
          <b-form-select id="event-place" v-model="event.place_id" required>
            <option v-for="place of places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Nome" label-for="event-name">
          <b-form-input
            id="event-name"
            placeholder="Ex.: Fim do mundo"
            v-model="event.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Data" label-for="event-date">
          <b-form-datepicker
            id="event-date"
            class="mb-2"
            v-model="event.date"
            required
            placeholder="Friday, December 21, 2012"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group label="Quantidade de Ingressos" label-for="event-tickets">
          <b-form-input type="number" id="event-tickets" v-model="event.tickets" min="1" required></b-form-input>
        </b-form-group>

        <!-- SPONSOR -->

        <b-form-group label="Patrocinador" label-for="sponsor-name">
          <b-form-input
            type="text"
            id="sponsor-name"
            v-model="event.sponsor.name"
            required
            placeholder="Ex.: RedBull"
          ></b-form-input>
        </b-form-group>

        <b-button pill variant="success" type="submit">Save</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      message: ""
    };
  },
  props: ["eventTemplate"],
  methods: {
    onSubmit(e) {
      e.preventDefault();

      // UPDATE
      if (this.event.id) {
        this.$store.dispatch("updateEvent", this.event);
      } else {
        // ADD
        this.$store.dispatch("addEvent", this.event);
      }
      // this.$router.push("/tickets");
    }
  },
  computed: {
    ...mapGetters(["places", "events"]),
    // // place_options() {
    // //   return this.$store.getters.places;
    // // },
    // events() {
    //   return this.$store.getters.events;
    // },
    event() {
      if (this.eventTemplate) {
        return this.eventTemplate;
      } else {
        return {
          id: "",
          place_id: "",
          name: "",
          date: "",
          description: "",
          image:
            "https://softsmart.co.za/wp-content/uploads/2018/06/image-not-found-1038x576.jpg",
          sponsor: {
            name: ""
          },
          tickets: 0,
          buyers: []
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#editForm {
  margin: 20px auto;
  border: 1px solid rgba($color: #000000, $alpha: 0.125);
  border-radius: 6px;
  padding: 1.25rem;
}
#mainForm {
}
</style>
