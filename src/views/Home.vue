<template>
    <div class="home">
        <div class="page-title">
            <!-- SHOULD NOT USE V-IF -->
            <h1 v-if="activeUser">Olá {{ activeUser.name }}</h1>
            <h1 v-else>Bem Vindxs</h1>
        </div>

        <div class="section">
            <div class="section-title">
                <h2>Estes são os proximos eventos disponíveis!</h2>
            </div>
            <div class="flex center">
                <!-- SHOULD NOT USE V-IF -->
                <div v-for="event in topEvents(3)" :key="event.id">
                    <event-card :event="event" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventCard from "../components/EventCard.vue";

export default {
    name: "Home",

    components: {
        "event-card": EventCard
    },

    computed: {
        ...mapGetters(["topEvents", "activeUser"])
    },
    methods: {
        // ...mapActions(["fetchEvents"]),
    },
    created() {
        // this.fetchEvents();
    }
};
</script>
<style lang="scss" scoped>
.stretch {
    align-items: stretch;
}
</style>
