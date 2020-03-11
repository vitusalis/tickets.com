<template>
  <div id="editForm">
    <h4>Editar #{{ event.id }}</h4>
    <b-form id="mainForm">
      <b-form-group label="Name" label-for="event-name">
        <b-form-input id="event-name" placeholder="Ex.: Carreta Furacão" v-model="event.name"></b-form-input>
      </b-form-group>

      <b-form-group label="Date" label-for="event-date">
        <b-form-datepicker id="event-date" class="mb-2" v-model="event.date"></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Tickets" label-for="event-tickets">
        <b-form-input type="number" id="event-tickets" v-model="event.tickets"></b-form-input>
      </b-form-group>

      <b-button variant="success" @click="saveEvent">Save</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["event"],
  methods: {
    saveEvent() {
      this.$store.commit("UPDATE_LS", "events");
      //   this.$store.dispatch("UPDATE_LS", "events");
      this.$router.go(-2);
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
