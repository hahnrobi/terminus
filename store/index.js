import Vuex from "vuex";

export default () => new Vuex.Store({
    state: {
        currentUser: {email:""},
        ownedShells: []
    },
    getters : {
        ownedShells: (state) => state.ownedShells
    },
    mutations: {
        LOGIN_USER(state, user) {
            state.currentUser = user;
        },
        LOGOUT_USER(state) {
            state.currentUser = {};
        },
        SET_OWNED_SHELLS(state, shells) {
            state.ownedShells = shells;
        }
    },
    actions: {
        loginUser({commit}, {email, password}) {
            commit("LOGIN_USER", user);
        },
        logoutUser({commit}) {
            commit("LOGOUT_USER");
        },
        async getOwnedShells({ commit }) {
            //TODO: Token auth
            await this.$axios.get("/shell")
                .then(res => {
                    commit('SET_OWNED_SHELLS', res.data);
                })
        }
    }
});