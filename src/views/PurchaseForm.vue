<template>
    <div>
        <div>
            <div class="page-title">
                <h1>Carrinho</h1>
            </div>
            <b-overlay :show="!this.event" rounded="sm" style="margin-top:40px">
            </b-overlay>
            <div class="section" v-if="this.event">
                <h3>
                    Voce está comprando ingressos para o evento
                    {{ this.event.name }}
                </h3>

                <div class="flex">
                    <form @submit.prevent="atSubmit" class="form card">
                        <b-form-group label="Nome" label-for="name">
                            <b-form-input
                                id="name"
                                type="text"
                                required
                                v-model="client.name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Email" label-for="email">
                            <b-form-input
                                id="email"
                                type="email"
                                required
                                v-model="client.email"
                            ></b-form-input>
                        </b-form-group>

                        <!-- SHOULD NOT USE V-IF -->
                        <b-form-group
                            label="Quantidade"
                            label-for="quantity"
                            v-if="event && client"
                        >
                            <b-form-input
                                id="quantity"
                                type="number"
                                required
                                min="1"
                                v-model="client.tickets"
                            ></b-form-input>
                        </b-form-group>

                        <b-button pill variant="success" type="submit"
                            >Enviar</b-button
                        >
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            client: {},
            event: undefined
        };
    },

    computed: {
        ...mapGetters(["events", "eventById", "activeUser", "purchases"])
    },

    methods: {
        ...mapActions(["addPurchase", "fetchEvents"]),
        atSubmit() {
            var purchase = {
                id: Math.floor(Math.random() * 10000000) + 1,
                clientID: this.client.id,
                clientName: this.client.name,
                clientEmail: this.client.email,
                eventID: this.event.id,
                ticketAmmount: this.client.tickets
            };
            this.addPurchase(purchase);
            this.$router.push("/");
        }
    },

    created() {
        // this.event = this.eventById(this.$route.params.id);
        if (!this.event) {
            setTimeout(() => {
                this.event = this.eventById(this.$route.params.id);
            }, 1000);
        }
        this.client = {
            ...this.activeUser,
            password: undefined,
            tickets: 1
        };
    }
};
</script>

<style>
.form {
    padding: 10px;
}
</style>
