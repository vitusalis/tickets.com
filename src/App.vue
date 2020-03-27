<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: { navbar: Navbar },
  methods: {
    ...mapActions([
      "fetchEvents",
      "fetchActiveUser",
      "fetchPurchases",
      "fetchUsers",
      "fetchPlaces"
    ])
  },
  created() {
    this.fetchEvents();
    this.fetchActiveUser();
    this.fetchPurchases();
    this.fetchPlaces();
  }
};
</script>
