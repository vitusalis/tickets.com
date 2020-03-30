import Axios from "axios";

const state = {
    events: []
};
var urls = [
    "http://localhost:3000/events",
    "https://my-json-server.typicode.com/vitusalis/testDB/events"
];

// urls = urls.reverse();

const getters = {
    events: state => state.events,

    eventById: state => id => state.events.filter(e => e.id == id)[0],

    topEvents: state => thisMany => {
        var events = state.events.filter(el => {
            return el.image;
        });
        events = events.sort((a, b) => {
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        // returns thisMany items
        return events.slice(0, thisMany);
    },

    eventsByPlaceId: state => placeID => {
        return state.events.filter(el => el.place_id == placeID);
    }
};

const actions = {
    fetchEvents({ commit }) {
        Axios.get(urls[0])
            .then(response => {
                commit("setEvents", response.data);
            })
            .catch(
                Axios.get(urls[0]).then(response => {
                    commit("setEvents", response.data);
                })
            );
    },

    addEvent({ commit, getters }, event) {
        // event.id = Math.floor(Math.random() * 10000000) + 1;
        event.id = getters.events[getters.events.length - 1].id + 1;
        // post
        Axios.post(urls[0], event).then(() =>
            // update
            commit("newEvent", event)
        );
    },
    updateEvent({ commit }, event) {
        var index = state.events.indexOf(event);
        setTimeout(() => {
            Axios.put(urls[0] + event.id, index).then(() => {
                commit("updateEvent", event);
            });
        }, 7000);
    },
    deleteEvent({ commit }, event) {
        Axios.delete(urls[0] + event.id, event).then(() => {
            commit("removeEvent", event);
        });
    }
};
const mutations = {
    setEvents: (state, events) => (state.events = events),

    newEvent: (state, event) => state.events.push(event),
    updateEvent: (state, newEvent) => {
        const index = state.events.findIndex(e => e.id === newEvent.id);
        if (index !== -1) {
            state.events.splice(index, 1, newEvent);
        }
    },
    removeEvent: (state, event) => {
        state.events = state.events.filter(e => e.id !== event.id);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
