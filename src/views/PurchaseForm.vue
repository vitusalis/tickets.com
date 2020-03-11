<template>
  <div>
    <h1 v-if="activeUser">Olá {{activeUser.name}}</h1>
    <h2 v-if="event">Voce está comprando ingressos para o evento {{event.name}}</h2>

    <div class="flex">
      <form @submit="atSubmit" class="form card">
        <b-form-group label="Nome" label-for="name">
          <b-form-input id="name" type="text" required v-model="client.name"></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" type="email" required v-model="client.email"></b-form-input>
        </b-form-group>

        <b-form-group label="Quantidade" label-for="quantity">
          <b-form-input
            id="quantity"
            type="number"
            required
            min="1"
            :max="Math.floor(event.tickets/10)"
            v-model="client.tickets"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit">Enviar</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    atSubmit(e) {
      e.preventDefault();
      console.log(JSON.stringify(this.client));

      this.event.tickets -= this.client.tickets;
      this.event.buyers.push(this.client);
      this.$store.commit("UPDATE_LS", "events");
      this.$router.push("/tickets");
    }
  },
  computed: {
    event() {
      var id = this.$route.params.id;
      return this.$store.getters.events.find(el => {
        return el.id == id;
      });
    },
    activeUser() {
      return this.$store.getters.active_user;
    },
    client() {
      // Return a copy of the active user
      return {
        ...this.activeUser,
        password: undefined,
        tickets: 1
      };
    }
  }
};
</script>

<style>
.form {
  padding: 10px;
}
</style>