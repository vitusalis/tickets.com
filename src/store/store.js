import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        places: [],
        events: [],
        users: [],
        active_user: undefined,
        lsData: [
            { lsName: "active_user", dbName: "active_user" },
            { lsName: "events", dbName: "events" },
            { lsName: "places", dbName: "places" }
        ]
    },
    mutations: {
        SET_STORE: (state, data) => {
            state.places = data.places;
            state.users = data.users;

            for (var item of state.lsData) {
                //------------- TRY AND GET IT FROM LOCAL STORAGE
                if (localStorage.getItem(item.lsName)) {
                    state[item.dbName] = JSON.parse(
                        localStorage.getItem(item.lsName)
                    );
                }
                //------------- GET IT FROM DATABASE
                else {
                    state[item.dbName] = data[item.dbName];
                }
                // console.log(item.dbName);
                // console.log(state[item.dbName]);
            }
        },
        SET_USER(state, user) {
            this.active_user = user;
            localStorage.setItem(
                "active_user",
                JSON.stringify(this.active_user)
            );
        },
        UPDATE_LS(state, variable) {
            localStorage.setItem(variable, JSON.stringify(state[variable]));
        }
    },

    actions: {
        INITIALIZE_STORE: ({ commit }) => {
            Axios.get("static/db.json").then(response => {
                commit("SET_STORE", response.data);
            });
        }
    },
    getters: {
        places: state => state.places,
        users: state => state.users,
        active_user: state => state.active_user,
        events: state => state.events
    }
});
