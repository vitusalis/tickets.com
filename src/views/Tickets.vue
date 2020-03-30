<template>
    <div>
        <b-tabs content-class="mt-3">
            <!-- <h2>Info</h2> -->
            <b-tab v-for="place in places" :key="place.id" :title="place.name">
                <h4>{{ place.name }}</h4>
                <h5>{{ place.address }}</h5>
                <h6>Capacidade: {{ place.capacity }}</h6>
                <h6>Telefone: {{ place.phone }}</h6>
                <h6>Email: {{ place.email }}</h6>
                <!-- <b-table responsive striped hover :items="[place]"></b-table> -->

                <div class="section">
                    <div class="flex relative">
                        <h2 class="center">Shows</h2>
                        <div class="right">
                            <router-link
                                tag="span"
                                :to="{ name: 'create-event' }"
                            >
                                <b-button pill class="dark"
                                    >Novo Evento</b-button
                                >
                            </router-link>
                        </div>
                    </div>

                    <!-- SHOWS -->

                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>DATA</th>
                                <th>INGRESSOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="show in eventsByPlaceId(place.id)"
                                :key="show.id"
                            >
                                <td>{{ show.id }}</td>
                                <td>
                                    <router-link
                                        tag="a"
                                        :to="{
                                            name: 'event',
                                            params: { id: show.id }
                                        }"
                                        >{{ show.name }}</router-link
                                    >
                                </td>
                                <!-- <td>{{new Date(show.date)}}</td> -->
                                <td>{{ show.date }}</td>
                                <td>
                                    {{
                                        show.tickets - ticketsByEventId(show.id)
                                    }}
                                    de {{ show.tickets }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {};
    },

    computed: {
        ...mapGetters([
            "places",
            "events",
            "eventsByPlaceId",
            "ticketsByEventId"
        ])
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
// PHONE
@media screen and (max-width: 900px) {
    .flex {
        flex-direction: column;
    }
}
// DESKTOP
@media screen and (min-width: 900px) {
    .right {
        position: absolute;
        right: 30px;
    }
}

// ALL
.center {
    justify-self: center;
}
</style>
