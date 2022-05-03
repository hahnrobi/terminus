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
        terminals: [],
        currentTerminal: ""
    },
    getters : {
        ownedShells: (state) => state.ownedShells,
        getOwnedShell: (state, shellId) => state.ownedShells.filter(_id === shellId),
        getLayoutParams: (state) => state.layoutParams,
        getTerminals: (state) => state.terminals,
        getTerminal: (state, id) => state.terminals.filter(_id => _id = id),
        getCurrentTerminal: (state) => state.terminals.find(_id => _id = state.currentTerminal),
    },
    mutations: {
        SET_OWNED_SHELLS(state, shells) {
            state.ownedShells = shells;
        },
        UPDATE_LAYOUT_PARAMS(state, {param, value}) {
            state.layoutParams[param] = value;
            console.log(state.layoutParams);
        },
        ADD_TERMINAL(state,  value) {
            state.terminals.push(value);
        },
        REMOVE_TERMINAL(state,  id) {
            state.terminals = state.terminals.filter(_term => _term.id != id);
        },
        SET_CURRENT_TERMINAL(state, value) {
            state.currentTerminal = value;
        },
        UPDATE_TERMINAL_STATE(state, {id, param, value}) {
            const term = state.terminals.find(x => x.id == id);
            term[param] = value;
            console.log("Update", term);
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