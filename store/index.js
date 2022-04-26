import Vuex from "vuex";

export default () => new Vuex.Store({
    state: {
        currentUser: {email:""},
        ownedShells: [],
        layoutParams: {
            clipped: false,
            drawer: false,
            fixed: false,
            userMenu: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
        }
    },
    getters : {
        ownedShells: (state) => state.ownedShells,
        getOwnedShell: (state, shellId) => state.ownedShells.filter(_id === shellId),
        getLayoutParams: (state) => state.layoutParams
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
        },
        UPDATE_LAYOUT_PARAMS(state, payload) {
            state.layoutParams = payload;
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
        },
        getOwnedShellDetails({ commit }, id) {
            return this.state.getOwnedShell(id);
        },
        getLayoutParams() {
            return this.state.layoutParams;
        },
        updateLayoutParams({commit}) {
            commit('UPDATE_LAYOUT_PARAMS', commit);
        }
    }
});