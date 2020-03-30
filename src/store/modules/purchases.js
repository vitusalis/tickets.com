import Axios from "axios";

const state = {
    purchases: []
};

const getters = {
    purchases: state => state.purchases,

    purchaseById: state => id => state.purchases.filter(p => p.id == id)[0],

    purchasesByEventId: state => id =>
        state.purchases.filter(p => p.eventID == id),

    purchasesByUserId: state => id =>
        state.purchases.filter(p => p.clientID == id),

    ticketsByEventId: state => id =>
        state.purchases
            .filter(p => p.eventID == id)
            .reduce((acc, cur) => acc + parseInt(cur.ticketAmmount), 0),
    ticketsByUserId: state => id =>
        state.purchases
            .filter(p => p.clientID == id)
            .reduce((acc, cur) => acc + parseInt(cur.ticketAmmount), 0)
};

const actions = {
    fetchPurchases({ commit }) {
        Axios.get("http://localhost:3000/purchases").then(response => {
            commit("setPurchases", response.data);
        });
    },

    addPurchase({ commit }, purchase) {
        // add id
        purchase.id = Math.floor(Math.random() * 10000000) + 1;
        // post
        Axios.post("http://localhost:3000/purchases", purchase).then(() =>
            // update
            commit("newPurchase", purchase)
        );
    },
    updatePurchase({ commit }, purchase) {
        Axios.put(
            `http://localhost:3000/purchases/${purchase.id}`,
            purchase
        ).then(() => {
            commit("updatePurchase", purchase);
        });
    },
    deletePurchase({ commit }, purchase) {
        Axios.delete(
            `http://localhost:3000/purchases/${purchase.id}`,
            purchase
        ).then(() => {
            commit("removePurchase", purchase);
        });
    },
    deletePurchaseById({ commit, getters }, id) {
        var purchase = getters.purchaseById(id);
        Axios.delete(`http://localhost:3000/purchases/${id}`, purchase).then(
            () => {
                commit("removePurchase", purchase);
            }
        );
    }
};
const mutations = {
    setPurchases: (state, purchases) => (state.purchases = purchases),
    newPurchase: (state, purchase) => state.purchases.push(purchase),
    updatePurchase: (state, newPurchase) => {
        const index = state.purchases.findIndex(e => e.id === newPurchase.id);
        if (index !== -1) {
            state.purchases.splice(index, 1, newPurchase);
        }
    },
    removePurchase: (state, purchase) => {
        state.purchases = state.purchases.filter(e => e.id !== purchase.id);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
