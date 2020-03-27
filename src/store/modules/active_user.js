const state = {
    active_user: undefined
};

const getters = {
    activeUser: state => state.active_user,
    isActiveUser: state => state.active_user != undefined
};

const actions = {
    fetchActiveUser({ commit }) {
        var user = {};
        new Promise((resolve, reject) => {
            user = JSON.parse(localStorage.getItem("active_user"));

            const error = false;
            if (!error) {
                resolve();
            } else {
                reject("could not get ACTIVE_USER");
            }
        }).then(commit("setActiveUser", user));
    },
    addActiveUser({ commit }, user) {
        localStorage.setItem("active_user", JSON.stringify(user));
        commit("setActiveUser", user);
    },
    removeActiveUser({ commit }) {
        localStorage.removeItem("active_user");
        commit("removeActiveUser");
    }
};
const mutations = {
    setActiveUser: (state, user) => (state.active_user = user),
    removeActiveUser: state => {
        state.active_user = undefined;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
