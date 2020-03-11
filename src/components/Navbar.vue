<template>
  <div id="main">
    <nav id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/tickets">Tickets</router-link>
    </nav>

    <!-- <login v-if="!this.$store.getters.active_user" id="login" /> -->
  </div>
</template>

<script>
// import Login from "./Login.vue";
export default {
  // components: { login: Login }
};
</script>

<style lang="scss" scoped>
#main {
  #nav {
  }
  #login {
    position: absolute;
    top: 5%;
    left: 80%;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
