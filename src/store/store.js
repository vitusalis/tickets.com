import Vue from "vue";
import Vuex from "vuex";
import events from "./modules/events";
import purchases from "./modules/purchases";
import users from "./modules/users";
import places from "./modules/places";
import activeUser from "./modules/active_user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        places,
        users,
        events,
        purchases,
        activeUser
    }
});
