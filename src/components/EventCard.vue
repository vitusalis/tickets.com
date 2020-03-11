<template>
  <b-card
    :img-src="event.image"
    :title="event.name"
    :sub-title="event.date"
    tag="article"
    style="max-width: 20rem; min-width: 20rem;"
    class="mb-2"
    footer-tag="footer"
  >
    <b-card-text>Ingressos: {{ event.tickets }}</b-card-text>
    <b-card-text>Patrocinador: {{ event.sponsor.name }}</b-card-text>
    <b-card-text v-if="description">{{ event.description }}</b-card-text>

    <b-button variant="primary" @click="purchase(event)">Comprar</b-button>
    <slot></slot>
  </b-card>
</template>

<script>
export default {
  props: ["event", "description"],

  methods: {
    purchase(event) {
      this.$router.push({ name: "purchase-event", params: { id: event.id } });
      console.log(event);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-img {
  width: 20rem;
  height: 14rem;
  object-fit: cover;
}
.card {
  margin: 10px;
  // height: 100%;
}
</style>