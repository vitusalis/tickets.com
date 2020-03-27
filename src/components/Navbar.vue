<template>
  <div id="main">
    <nav id="nav" class="relative">
      <div class="left">
        <router-link id="logo" to="/">TICKETS.COM</router-link>
      </div>
      <router-link to="/">Home</router-link>
      <router-link to="/tickets">Ingressos</router-link>
      <router-link to="/about">Sobre</router-link>

      <div class="right">
        <router-link to="/login" v-if="! isActiveUser">Login</router-link>
        <div v-else>
          <router-link to="/user">Meu Perfil</router-link>
          <a href @click="logout">LOGOUT</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isActiveUser"])
  },
  methods: {
    logout() {
      localStorage.removeItem("active_user");
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  #nav {
    display: flex;
    flex-direction: column;
  }
  .right,
  .left {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
  }
}
#nav {
  padding: 30px;
  color: #fafafa;
  background-color: #333;
  a {
    text-transform: uppercase;
    font-weight: bold;
    color: inherit;
    margin: auto 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  #logo {
    font-weight: 600;
    letter-spacing: normal;
    font-size: 1.5em;
    &:hover {
      text-decoration: none;
    }
    &.router-link-exact-active {
      color: inherit;
    }
  }
}
</style>
