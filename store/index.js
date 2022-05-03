import Vuex from "vuex";

export default () => new Vuex.Store({
    state: {
        ownedShells: [],
        layoutParams: {
            clipped: false,
            drawer: false,
            fixed: false,
            userMenu: false,
            miniVariant: false,
            right: true,
            rightDrawer: false,
        },
    },
    getters : {
        ownedShells: (state) => state.ownedShells,
        getOwnedShell: (state, shellId) => state.ownedShells.filter(_id === shellId),
        getLayoutParams: (state) => state.layoutParams,
    },
    mutations: {
        SET_OWNED_SHELLS(state, shells) {
            state.ownedShells = shells;
        },
        UPDATE_LAYOUT_PARAMS(state, {param, value}) {
            state.layoutParams[param] = value;
            console.log(state.layoutParams);
        }
    },
    actions: {
        async getOwnedShells({ commit }) {
            if(this.$auth.$storage.getState('loggedIn')) {
            await this.$axios.get("/shell")
                .then(res => {
                    commit('SET_OWNED_SHELLS', res.data);
                })
            }else {
                commit('SET_OWNED_SHELLS', []);
            }
        },
        getOwnedShellDetails({ commit }, id) {
            return this.state.getOwnedShell(id);
        }
    }
});