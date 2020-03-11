<template>
  <div>
    <h4 v-if="event.name">Editando evento #{{event.id}}</h4>
    <h4 v-else>Novo Evento</h4>
    <!-- {{event}} -->
    <div class="flex">
      <b-form @submit="onSubmit" id="mainForm">
        <b-form-group label="Casa do Evento" label-for="event-place">
          <b-form-select id="event-place" v-model="event.place_id" required>
            <option
              v-for="place of place_options"
              :key="place.info.id"
              :value="place.info.id"
            >{{ place.info.name }}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Nome" label-for="event-name">
          <b-form-input
            id="event-name"
            placeholder="Ex.: Carreta Furacão"
            v-model="event.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Data" label-for="event-date">
          <b-form-datepicker id="event-date" class="mb-2" v-model="event.date" required></b-form-datepicker>
        </b-form-group>

        <b-form-group label="Quantidade de Ingressos" label-for="event-tickets">
          <b-form-input type="number" id="event-tickets" v-model="event.tickets" min="1" required></b-form-input>
        </b-form-group>

        <!-- SPONSOR -->

        <b-form-group label="Patrocinador" label-for="sponsor-name">
          <b-form-input type="text" id="sponsor-name" v-model="event.sponsor.name"></b-form-input>
        </b-form-group>

        <b-button variant="success" type="submit">Save</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
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

      if (this.events.filter(el => el.id == this.event.id)) {
        console.log("UPDATED");
      } else {
        // SET ID
        this.event.id = Math.floor(Math.random() * 100000) + 1;
        // PUSH EVENT
        this.events.push(this.event);
      }
      // COMMIT
      this.$store.commit("UPDATE_LS", "events");
      this.$router.push("/tickets");
    }
  },
  computed: {
    place_options() {
      return this.$store.getters.places;
    },
    events() {
      return this.$store.getters.events;
    },
    event() {
      if (this.eventTemplate) {
        // this.message = "Editando evento";
        return this.eventTemplate;
      } else {
        // this.message = "Novo evento";
        return {
          id: "",
          place_id: "",
          name: "",
          date: "",
          description: "",
          image: "",
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
