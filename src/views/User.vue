<template>
    <div>
        <!-- {{ user }} -->
        <b-jumbotron :header="activeUser.name" :lead="activeUser.email">
            <div id="adm">
                <h4>Administrando</h4>
                <b-list-group
                    class="list"
                    v-for="(place, key) of placesUserAdminister"
                    :key="key"
                >
                    <b-list-group-item>
                        {{ place.name }}
                    </b-list-group-item>
                </b-list-group>
            </div>
            <div class="eventos">
                <h4>Meus eventos</h4>
                <b-list-group v-if="userEvents.length" class="list">
                    <b-list-group-item
                        v-for="(event, key) in userEvents"
                        :key="key"
                        :to="{
                            name: 'event',
                            params: { id: event.id }
                        }"
                    >
                        {{ event.name }}
                        <b-badge variant="primary" pill>{{
                            event.tickets
                        }}</b-badge>
                    </b-list-group-item>
                </b-list-group>
                <h3 v-else class="text-secondary">Nenhum evento encontrado</h3>
            </div>
        </b-jumbotron>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "events",
            "places",
            "activeUser",
            "purchasesByUserId",
            "eventById"
        ]),

        userEvents() {
            // mapping the tickets bought with the user id, then mapping the purchases that have those id
            var userTickets = this.purchasesByUserId(this.activeUser.id);
            var events = userTickets.map(el => {
                return {
                    ...this.eventById(el.eventID),
                    tickets: el.ticketAmmount
                };
            });

            return events;
        },
        placesUserAdminister() {
            return this.places.filter(p => this.activeUser.adm.includes(p.id));
        }
    }
};
</script>

<style lang="scss" scoped>
.list {
    max-width: 20rem;
    margin: auto;
}
</style>
