import Axios from "axios";

const state = {
    users: []
};

const getters = {
    users: state => state.users,
    userById: state => id => state.users.filter(e => e.id == id)[0]
};

const actions = {
    fetchUsers({ commit }) {
        Axios.get("http://localhost:3000/users").then(response => {
            commit("setUsers", response.data);
        });
    },

    addUser({ commit }, user) {
        // add id
        user.id = Math.floor(Math.random() * 10000000) + 1;
        // post
        Axios.post("http://localhost:3000/users", user).then(() =>
            // update
            commit("newUser", user)
        );
    },
    updateUser({ commit }, user) {
        Axios.put(`http://localhost:3000/users/${user.id}`, user).then(() => {
            commit("updateUser", user);
        });
    },
    deleteUser({ commit }, user) {
        Axios.delete(`http://localhost:3000/users/${user.id}`, user).then(
            () => {
                commit("removeUser", user);
            }
        );
    }
};
const mutations = {
    setUsers: (state, users) => (state.users = users),
    newUser: (state, user) => state.users.push(user),
    updateUser: (state, newUser) => {
        const index = state.users.findIndex(e => e.id === newUser.id);
        if (index !== -1) {
            state.users.splice(index, 1, newUser);
        }
    },
    removeUser: (state, user) => {
        state.users = state.users.filter(e => e.id !== user.id);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
