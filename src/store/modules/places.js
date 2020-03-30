import Axios from "axios";

const state = {
    places: []
};

var urls = [
    "http://localhost:3000/places",
    "https://my-json-server.typicode.com/vitusalis/testDB/places"
];
// urls = urls.reverse();

const getters = {
    places: state => state.places,

    placeById: state => id => state.places.filter(e => e.id == id)[0],

    topPlaces: state => thisMany => {
        var places = state.places.filter(el => {
            return el.image;
        });
        places = places.sort((a, b) => {
            var keyA = new Date(a.date),
                keyB = new Date(b.date);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        // returns thisMany items
        return places.slice(0, thisMany);
    }
};

const actions = {
    fetchPlaces({ commit }) {
        Axios.get(urls[0]).then(response => {
            commit("setPlaces", response.data);
        });
    },

    addPlace({ commit }, place) {
        // add id
        place.id = Math.floor(Math.random() * 10000000) + 1;
        // post
        Axios.post(urls[0], place).then(() =>
            // update
            commit("newPlace", place)
        );
    },
    updatePlace({ commit }, place) {
        Axios.put(urls[0] + place.id, place).then(() => {
            commit("updatePlace", place);
        });
    },
    deletePlace({ commit }, place) {
        Axios.delete(urls[0] + place.id, place).then(() => {
            commit("removePlace", place);
        });
    }
};
const mutations = {
    setPlaces: (state, places) => (state.places = places),
    // setPlaces: (state, places) => (state.places = places),
    newPlace: (state, place) => state.places.push(place),
    updatePlace: (state, newPlace) => {
        const index = state.places.findIndex(e => e.id === newPlace.id);
        if (index !== -1) {
            state.places.splice(index, 1, newPlace);
        }
    },
    removePlace: (state, place) => {
        state.places = state.places.filter(e => e.id !== place.id);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
