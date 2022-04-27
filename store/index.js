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
        terminalTheme: ""
    },
    getters : {
        ownedShells: (state) => state.ownedShells,
        getOwnedShell: (state, shellId) => state.ownedShells.filter(_id === shellId),
        getLayoutParams: (state) => state.layoutParams,
        getTerminalTheme: (state) => {
            if (process.browser && !state.terminalTheme){
                state.terminalTheme = localStorage.getItem("terminal-theme");
            }
            return state.terminalTheme;
        }
    },
    mutations: {
        SET_OWNED_SHELLS(state, shells) {
            state.ownedShells = shells;
        },
        UPDATE_LAYOUT_PARAMS(state, {param, value}) {
            state.layoutParams[param] = value;
            console.log(state.layoutParams);
        },
        SET_TERMINAL_THEME(state, theme) {
            state.terminalTheme = theme;
            localStorage.setItem("terminal-theme", theme);
        }
    },
    actions: {
        async getOwnedShells({ commit }) {
            //TODO: Token auth
            await this.$axios.get("/shell")
                .then(res => {
                    commit('SET_OWNED_SHELLS', res.data);
                })
        },
        getOwnedShellDetails({ commit }, id) {
            return this.state.getOwnedShell(id);
        }
    }
});