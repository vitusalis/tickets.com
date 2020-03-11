<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "app",
  components: { navbar: Navbar },
  created() {
    this.$store.dispatch("INITIALIZE_STORE");
  }
};
</script>
