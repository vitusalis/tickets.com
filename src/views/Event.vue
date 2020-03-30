<template>
    <div class="flex center vertical">
        <event-card
            :event="eventById(this.$route.params.id)"
            v-if="!editing"
            :fullInfo="true"
        >
            <div class="flex horizontal" v-if="isAdm">
                <b-button pill @click="edit" variant="warning">Editar</b-button>
                <b-button pill @click="remove" variant="danger"
                    >Excluir</b-button
                >
            </div>
        </event-card>

        <router-view
            :eventTemplate="eventById(this.$route.params.id)"
        ></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventCard from "../components/EventCard.vue";
export default {
    data() {
        return {
            editing: false
        };
    },
    components: { "event-card": EventCard },
    methods: {
        ...mapActions(["deleteEvent"]),
        edit() {
            this.editing = true;
            this.$router.push({ name: "update-event" });
        },
        remove() {
            var e = this.eventById(this.$route.params.id);
            this.deleteEvent(e);
        }
    },
    computed: {
        ...mapGetters(["eventById", "activeUser"]),
        isAdm() {
            if (this.activeUser) {
                var placeid = this.eventById(this.$route.params.id).place_id;
                return this.activeUser.adm.includes(placeid);
            }
            return false;
        }
    },
    created() {}
};
</script>
