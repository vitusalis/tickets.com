<template>
    <!-- SHOULD NOT USE V-IF -->
    <div v-if="event">
        <br />
        <b-card
            :img-src="event.image"
            tag="article"
            style="max-width: 20rem; min-width: 20rem;"
            class="mb-2"
            footer-tag="footer"
            :id="event.id"
        >
            <b-card-title>
                <span v-if="fullInfo">{{ event.name }}</span>
                <router-link
                    v-else
                    tag="a"
                    :to="{
                        name: 'event',
                        params: { id: event.id }
                    }"
                    >{{ event.name }}</router-link
                >
            </b-card-title>

            <b-card-subTitle>{{ event.date }}</b-card-subTitle>

            <b-card-text
                :class="[
                    event.tickets > ticketsByEventId(event.id) ? '' : 'disabled'
                ]"
            >
                Ingressos disponiveis:
                <br />
                {{ event.tickets - ticketsByEventId(event.id) }} de
                {{ event.tickets }}
            </b-card-text>

            <b-card-text>Patrocinador: {{ event.sponsor.name }}</b-card-text>

            <b-card-text v-if="fullInfo">{{ event.description }}</b-card-text>

            <b-button
                pill
                variant="success"
                @click="buy(event)"
                :class="[
                    event.tickets > ticketsByEventId(event.id) ? '' : 'disabled'
                ]"
                >Comprar</b-button
            >
            <slot></slot>
        </b-card>

        <!-- BUYER INFORMATION -->
        <div class="card" id="buyers-card" v-if="fullInfo">
            <h3>Ingressos comprados</h3>
            <div v-if="ticketsByEventId(event.id) > 0">
                <b-list-group>
                    <b-list-group-item
                        v-for="(item, key) of purchasesByEventId(event.id)"
                        :key="key"
                        class="d-flex justify-content-between align-items-center"
                    >
                        {{ item.clientName }}
                        <!-- {{userById(item.clientID).name}} -->
                        <div style="display: flex-end">
                            <b-badge variant="primary" pill>{{
                                item.ticketAmmount
                            }}</b-badge>
                            <b-badge
                                variant="danger"
                                pill
                                @click="deletePurchase(item.id)"
                                style="cursor:pointer"
                                title="deletar"
                                >&times;</b-badge
                            >
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </div>
            <h4 v-else class="text-secondary">Nenhum ainda</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            dataAgora: new Date(Date.now())
        };
    },
    props: ["event", "description", "fullInfo"],
    computed: {
        ...mapGetters([
            "ticketsByEventId",
            "purchaseById",
            "purchasesByEventId",
            "userById"
        ])
    },

    methods: {
        ...mapActions(["fetchUsers", "fetchEvents", "deletePurchaseById"]),
        buy(event) {
            this.$router.push({
                name: "purchase-event",
                params: { id: event.id }
            });
        },
        deletePurchase(id) {
            this.deletePurchaseById(id);
        }
    },
    created() {
        this.fetchUsers();
        this.fetchEvents();
    }
};
</script>

<style lang="scss" scoped>
.card {
    margin: 10px;
}
.card-img {
    width: 20rem;
    height: 14rem;
    object-fit: cover;
}
#buyers-card {
    padding: 10px 25px;
}
a {
    color: inherit;
}
.disabled {
    pointer-events: none;
}
</style>
